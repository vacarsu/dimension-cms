<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Finder\Finder;

$app->get('/api/pages', function(Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/pages' route");

    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $finder = new Finder();
    $data = [];

    $finder->files()->name('*.yml')->in($dataDir . 'pages');

    foreach ($finder as $file)
    {
        $PageData = $this->yamlCompiler->yamlToArray($file->getContents());
        $data[] = $PageData;
    }

    return json_encode($data);
});

$app->post('/api/pages', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/pages' route");

    $body = $request->getParsedBody();
    $dataDir = $this->get('settings')['directories']['dataDirectory'];

    $pageYaml = $this->yamlCompiler->arrayToYaml($body['page']);

    $this->yamlCompiler->writeFile($dataDir . $body['packageName'] . '/pages/' . $body['page']['name'] . '.yml', $pageYaml, false);
});

$app->get('/api/pages/{pageName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/pages/{pageName}' route");

    $dataDir = $this->get('settings')['directories']['dataDirectory'];

    $data = $this->yamlCompiler->loadFile($dataDir . 'pages/' . $args['pageName'] . '.yml');

    return json_encode($data);
});

$app->delete('/api/pages/{pageName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/pages/{pageName}' route");

    $dataDir = $this->get('settings')['directories']['dataDirectory'];

    $this->fileSystem->remove($dataDir . 'pages/' . $args['pageName'] . '.yml');

    return 'success';
});