<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Yaml\Yaml;

$app->get('/api/packages', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/packages' route");
    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $data = Yaml::parseFile($dataDir . 'packages.yml');

    return json_encode($data, true);
});

$app->get('/api/packages/{packageName}/{moduleName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/packages/{packageName}/{moduleName}' route");
    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $data = Yaml::parseFile($dataDir . $args['packageName'] . '/' . $args['moduleName'] . '.yml');

    return json_encode($data, true);
});

$app->get('/api/packages/{packageName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/package/{packageName}' route");
    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $packageData = Yaml::parseFile($dataDir . '/packages.yml');
    $data = $packageData[$args['packageName']];

    return json_encode($data, true);
});

$app->post('/api/packages/reload', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/packages/reload' route");
    $data = $this->packageLoader->loadPackageData();
    return json_encode($data, true);
});