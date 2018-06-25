<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Yaml\Yaml;

$app->get('/api/components/{packageName}', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/components' route");
    $dataDir = $this->get('settings')['directories']['dataDirectory'];
    $data = Yaml::parseFile($dataDir . $args['packageName'] . '/components.yml');

    return json_encode($data, true);
});