<?php

namespace Kairos\Services;

use Leafo\ScssPhp\Compiler;
use Leafo\ScssPhp\Exception\CompilerException;

class SassCompiler
{
    private $compiler;
    private $dataDir;
    private $packageDir;
    private $yamlCompiler;

    public function __construct($dataDir, $packageDir, $yamlCompiler)
    {
        $this->compiler = new Compiler();
        $this->dataDir = $dataDir;
        $this->packageDir = $packageDir;
        $this->yamlCompiler = $yamlCompiler;
        $this->compiler->setFormatter('Leafo\ScssPhp\Formatter\Crunched');
    }

    public function getPackageVariables($packageName)
    {
        $sassModuleData = $this->yamlCompiler->loadFile($this->dataDir . $packageName . '/sass.yml');
        return $sassModuleData['variables'];
    }

    public function compilePackage($packageName)
    {
        $packageVariables = $this->getPackageVariables($packageName);
        $this->compiler->setImportPaths($this->packageDir . $packageName . '/sass');
        $this->compiler->setVariables($packageVariables);
        return $this->compiler->compile('@import "index.scss";');
    }
}