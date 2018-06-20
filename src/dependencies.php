<?php
// DIC configuration
$container = $app->getContainer();

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['fileSystem'] = function ($c) {
    return new Symfony\Component\Filesystem\Filesystem();
};

$container['sassCompiler'] = function ($c) {
    $directories = $c->get('settings')['directories'];
    $dataDir = $directories['dataDirectory'];
    $packageDir = $directories['packageDirectory'];
    $yamlCompiler = $c->get('yamlCompiler');
    return new Kairos\Services\SassCompiler($dataDir, $packageDir, $yamlCompiler);
};

$container['yamlCompiler'] = function ($c) {
    return new Kairos\Services\YamlCompiler();
};

$container['packageLoader'] = function ($c) {
    $directories = $c->get('settings')['directories'];
    $packageDir = $directories['packageDirectory'];
    $dataDir = $directories['dataDirectory'];
    $yamlCompiler = $c->get('yamlCompiler');
    $fileSystem = $c->get('fileSystem');
    return new Kairos\Services\PackageLoader($dataDir, $packageDir, $yamlCompiler, $fileSystem);
};