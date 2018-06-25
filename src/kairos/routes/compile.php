<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/api/sass/compile', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/sass/compile' route");

    $body = $request->getParsedBody();
    $sassString = $this->sassCompiler->compilePackage($body['packageName']);
    $dumpFile = __DIR__ . '/../../../public/dist/' . $body['packageName'] . '.min.css';

    $this->fileSystem->dumpFile($dumpFile, $sassString);
    echo $body['packageName'];
});

$app->post('/api/sass/variables', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/sass/variables' route");

    $body = $request->getParsedBody();
    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $packagesData = $this->yamlCompiler->loadFile($dataDir . 'packages.yml');

    $packagesData[$body['packageName']]['modules']['sass'] = $body['sass'];

    $packagesYaml = $this->yamlCompiler->arrayToYaml($packagesData);

    $this->yamlCompiler->writeFile($dataDir . 'packages.yml', $packagesYaml);
});
