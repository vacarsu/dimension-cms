<?php

namespace Kairos\Routes;

use Slim\Http\Request;
use Slim\Http\Response;
use Symfony\Component\Yaml\Yaml;

$app->get('/api/components', function (Request $request, Response $response, array $args) {
    $this->logger->info("Slim-Skeleton '/api/components' route");
    $data = Yaml::parseFile(__DIR__ . '/../packages/kairos-base/components.yml');

    return json_encode($data, true);
});