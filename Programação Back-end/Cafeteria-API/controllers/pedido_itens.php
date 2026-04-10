<?php
// pedido_itens.php
require_once 'database.php';
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];
// Pega o ID do pedido via Query String (ex: ?pedido_id=10)
$pedido_id = isset($_GET['pedido_id']) ? $_GET['pedido_id'] : null;

switch($method) {
    case 'GET':
        if (!$pedido_id) {
            echo json_encode(['status' => 'error', 'message' => 'pedido_id nao informado']);
            break;
        }
        // Faz um JOIN para trazer o nome do produto junto
        $sql = "SELECT pi.*, p.nome as produto_nome 
                FROM pedido_itens pi 
                JOIN produtos p ON pi.produto_id = p.id 
                WHERE pi.pedido_id = :pedido_id";
        
        $resultado = $database->executeQuery($sql, [':pedido_id' => $pedido_id]);
        echo json_encode([
            'status' => 'success',
            'data'   => $resultado->fetchAll(PDO::FETCH_ASSOC)
        ]);
        break;

    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        
        $database->executeQuery(
            "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco) 
             VALUES (:pedido_id, :produto_id, :quantidade, :preco)",
            [
                ':pedido_id'  => $body['pedido_id'],
                ':produto_id' => $body['produto_id'],
                ':quantidade' => $body['quantidade'],
                ':preco'      => $body['preco']
            ]
        );
        
        // Atualiza o TOTAL do pedido — usa dois parametros nomeados distintos para evitar
        // o bug do bindValue com o mesmo placeholder usado duas vezes
        $pid = $body['pedido_id'];
        $database->executeQuery(
            "UPDATE pedidos 
             SET total = (SELECT SUM(quantidade * preco) FROM pedido_itens WHERE pedido_id = :pid_sub) 
             WHERE id = :pid_main",
            [':pid_sub' => $pid, ':pid_main' => $pid]
        );

        echo json_encode(['status' => 'success', 'message' => 'Item adicionado com sucesso']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['status' => 'error', 'message' => 'Metodo nao permitido.']);
}
