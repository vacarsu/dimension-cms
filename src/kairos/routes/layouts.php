<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Finder\Finder;

$app->get('/api/layouts', function(Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/layouts' route");

    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $finder = new Finder();
    $data = [];

    $finder->files()->name('*.yml')->in($dataDir . 'layouts');

    foreach ($finder as $file)
    {
        $layoutData = $this->yamlCompiler->yamlToArray($file->getContents());
        $data[] = $layoutData;
    }

    return json_encode($data);
});

$app->post('/api/layouts', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/layouts' route");

    $body = $request->getParsedBody();
    $dataDir = $this->get('settings')['directories']['dataDirectory'];

    $layoutYaml = $this->yamlCompiler->arrayToYaml($body['layout']);

    $this->yamlCompiler->writeFile($dataDir . $body['packageName'] . '/layouts/' . $body['layout']['name'] . '.yml', $layoutYaml, false);
});

$app->get('/api/layouts/{layoutName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/layouts/{layoutName}' route");

    $dataDir = $this->get('settings')['directories']['dataDirectory'];

    $data = $this->yamlCompiler->loadFile($dataDir . 'layouts/' . $args['layoutName'] . '.yml');

    return json_encode($data);
});