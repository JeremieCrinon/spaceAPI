<?php

$token = $_COOKIE['token']??''; // Récupérez le token de la requête

// Vérifiez le token avec l'API Laravel
$isTokenValid = callApiToVerifyToken($token);

// echo phpinfo();

if ($isTokenValid) {
    // Obtenez le chemin réel du fichier demandé
    $filePath = getFilePathBasedOnRequest();

    // Vérifiez que le fichier existe et n'est pas un répertoire
    if (file_exists($filePath) && !is_dir($filePath)) {
        // Servir le fichier
        readfile($filePath);
    } else {
        header("HTTP/1.1 404 Not Found");
        exit('File not found');
    }
} else {
    header("HTTP/1.1 401 Unauthorized");
    exit('Unauthorized');
}

// Fonction pour appeler votre API Laravel et vérifier le token
function callApiToVerifyToken($token) {
    // Données à envoyer
    $data = array(
        "token" => $token
    );

    // Initialiser une session cURL
    $ch = curl_init();

    // Définir l'URL et d'autres options pour la requête POST
    curl_setopt($ch, CURLOPT_URL, "http://localhost:8000/api/token");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Exécuter la requête cURL
    $response = curl_exec($ch);

    // Fermer la session cURL
    curl_close($ch);

    $response = json_decode($response);

    // var_dump($data);

    if($response->message === "L'utilisateur est autorisé") {
        // echo "true";
        // echo $response->message;
        return true;
    } else {
        // echo "false";
        // echo $response->message;
        return false;
    }

}

// Fonction pour déterminer le chemin du fichier basé sur la requête
function getFilePathBasedOnRequest() {
    $filePath = $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'];
    return $filePath;
}
?>
