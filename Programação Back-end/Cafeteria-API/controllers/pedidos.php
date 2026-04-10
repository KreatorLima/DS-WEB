<?php

header('Content-Type: application/json'); // Define o tipo de conteúdo da resposta como JSON
header('Access-Control-Allow-Origin: *'); // Permite requisições de qualquer origem (CORS)
header('Access-Control-Allow-Headers: Content-Type'); // Permite receber Content-Type no Header
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Define os métodos HTTP permitidos


require_once dirname(__DIR__) . '/database.php';
$database = new Database();

$method   = $_SERVER['REQUEST_METHOD'];
$path     = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path     = trim($path, '/');
$segments = explode('/', $path);

if (isset($segments[2])) {
    $id = $segments[2];
} else {
    $id = null;
}

switch($method){
    // -------------------------------------------------------
    // GET /pedidos 
    // GET /pedidos/1
    // -------------------------------------------------------
    case 'GET':
        $resultado = $database->executeQuery('SELECT * FROM pedidos');
        $pedidos = $resultado->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'status' => 'success',
            'data'   => $pedidos
        ]);
        break;
    // -------------------------------------------------------
    // POST /pedidos
    // Body: { "nome": "Bebidas" }
    // -------------------------------------------------------
    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $$cliente = isset($body['cliente']) ? trim($body['cliente']) : '';

        if(!$cliente){
            echo json_encode([
                'status' => 'error',
                'message' => 'Campo nome não informado'
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
            'idPedido' => $database->lastInsertId()
        ]);
        
        break;
    // -------------------------------------------------------
    // PUT /pedidos/1
    // Body: { "nome": "Salgados" }
    // -------------------------------------------------------
    case 'PUT':
        
        break;
    // -------------------------------------------------------
    // DELETE /pedidos/1
    // -------------------------------------------------------
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o id da pedido na URL.'
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
                'message' => 'Pedido não encontrada.'
            ]);
            break;
        }
 
        echo json_encode([
            'status'  => 'success',
            'message' => 'Pedido removido com sucesso.'
        ]);
        break;
    // -------------------------------------------------------
    // Método não permitido
    // -------------------------------------------------------
    default:
        http_response_code(405);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Método não permitido.'
        ]);
}


?>