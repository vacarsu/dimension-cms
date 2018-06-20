<?php

namespace Kairos\Services;

use Symfony\Component\Yaml\Yaml;

class YamlCompiler
{
    private $yaml;

    public function __construct()
    {
        $this->yaml = new Yaml();
    }

    public function loadFile($path)
    {
        return $this->yaml->parseFile($path);
    }

    public function writeFile($path, $yamlString)
    {
        file_put_contents($path, $yamlString);
    }

    public function arrayToYaml($array)
    {
        return $this->yaml->dump($array, 50);
    }

    public function yamlToArray($yamlString)
    {
        return $this->yaml->parse($yamlString);
    }
}