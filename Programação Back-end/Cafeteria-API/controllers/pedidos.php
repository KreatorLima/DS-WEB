<?php

require_once 'database.php';
$database = new Database();

$method   = $_SERVER['REQUEST_METHOD'];
$path     = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path     = trim($path, '/');
$segments = explode('/', $path);

$id = (count($segments) > 0 && is_numeric(end($segments))) ? end($segments) : null;

switch($method){
    // -------------------------------------------------------
    // GET /categorias 
    // GET /categorias/1
    // -------------------------------------------------------
    case 'GET':
        $resultado = $database->executeQuery('SELECT * FROM pedidos');
        $pedidos = $resultado->fetchAll(PDO::FETCH_ASSOC); // Busca os dados

        echo json_encode([
            'status' => 'success',
            'data'   => $pedidos
        ]);
        break;
    // -------------------------------------------------------
    // POST /categorias
    // Body: { "nome": "Bebidas" }
    // -------------------------------------------------------
    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $cliente = isset($body['cliente']) ? trim($body['cliente']) : null;

        if(!$cliente){
            echo json_encode([
                'status' => 'error',
                'message' => 'Campo nome nÃ£o informado'
            ]);
            break;
        }
        $database->executeQuery(
            "INSERT INTO pedidos (cliente) VALUES (:cliente)",
            [ ':cliente' => $cliente ]
        );

        http_response_code(201);
        echo json_encode([
            'status' => 'success',
            'message' => 'Pedido cadastrado com sucesso',
            'idPedidos' => $database->lastInsertId()
        ]);
        
        break;
    // -------------------------------------------------------
    // PUT /categorias/1
    // Body: { "nome": "Salgados" }
    // -------------------------------------------------------
    case 'PUT':
        
        break;
    // -------------------------------------------------------
    // DELETE /categorias/1
    // -------------------------------------------------------
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o id do Pedido na URL.'
            ]);
            break;
        }
 
        $stmt = $database->executeQuery(
            'DELETE FROM pedidos WHERE id = :id',
            [':id' => $id]
        );
 
        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Pedido não encontrado.'
            ]);
            break;
        }
 
        echo json_encode([
            'status'  => 'success',
            'message' => 'Pedido removido com sucesso.'
        ]);
        break;
    // -------------------------------------------------------
    // MÃ©todo nÃ£o permitido
    // -------------------------------------------------------
    default:
        http_response_code(405);
        echo json_encode([
            'status'  => 'error',
            'message' => 'MÃ©todo nÃ£o permitido.'
        ]);
}


?>
