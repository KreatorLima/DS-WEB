<?php



header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Headers: Content-Type');

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');



// Trata requisições OPTIONS (CORS)

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    exit;

}



require_once dirname(__DIR__) . '/database.php';

$database = new Database();



$method   = $_SERVER['REQUEST_METHOD'];

$path     = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$path     = trim($path, '/');

$segments = explode('/', $path);



// Pega o ID tanto da URL amigável quanto do parâmetro ?id=

$id = $segments[2] ?? $_GET['id'] ?? null;



switch($method){

    case 'GET':

        if (!$id) {

            echo json_encode(['status' => 'error', 'message' => 'ID do pedido não fornecido']);

            break;

        }



        // Correção: Usando placeholders para segurança e filtrando pelo pedido_id

        $resultado = $database->executeQuery(

            'SELECT * FROM pedido_itens WHERE pedido_id = :id',

            [':id' => $id]

        );

        $pedido = $resultado->fetchAll(PDO::FETCH_ASSOC);



        echo json_encode([

            'status' => 'success',

            'data'   => $pedido

        ]);

        break;



    case 'POST':

        $body = json_decode(file_get_contents('php://input'), true);

       

        $pedido_id  = $body['pedido_id'] ?? null;

        $produto_id = $body['produto_id'] ?? null;

        $quantidade = $body['quantidade'] ?? null;



        if (!$pedido_id || !$produto_id || !$quantidade) {

            echo json_encode([

                'status' => 'error',

                'message' => 'Dados incompletos'

            ]);

            break;

        }



        // 1. Busca o preço do produto automaticamente na tabela de produtos

        $resProduto = $database->executeQuery(

            "SELECT preco FROM produtos WHERE id = :prod_id",

            [':prod_id' => $produto_id]

        );

        $produto = $resProduto->fetch(PDO::FETCH_ASSOC);



        if (!$produto) {

            echo json_encode([

            'status' => 'error',

            'message' => 'Produto não encontrado']);

            break;

        }



        $precoUnitario = $produto['preco'];



        // 2. Insere na tabela pedido_itens

        $database->executeQuery(

            "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco) VALUES (:pedido_id, :produto_id, :quantidade, :preco)",

            [

                ':pedido_id'  => $pedido_id,

                ':produto_id' => $produto_id,

                ':quantidade' => $quantidade,

                ':preco'      => $precoUnitario

            ]

        );





        http_response_code(201);

        echo json_encode([

            'status' => 'success',

            'message' => 'Item adicionado com sucesso',

            'idItem' => $database->lastInsertId()

        ]);

        break;



    case 'DELETE':

        if (!$id) {

            http_response_code(400);

            echo json_encode(['status' => 'error', 'message' => 'ID não informado']);

            break;

        }



        $database->executeQuery('DELETE FROM pedido_itens WHERE id = :id', [':id' => $id]);



        echo json_encode(['status' => 'success', 'message' => 'Item removido']);

        break;



    default:

        http_response_code(405);

        echo json_encode(['status' => 'error', 'message' => 'Método não permitido']);

}