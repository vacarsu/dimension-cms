<?php

namespace Kairos\Services;

use Symfony\Component\Finder\Finder;

class PackageLoader
{
    private $dataDir;
    private $packageDir;
    private $fileSystem;
    private $yamlCompiler;

    public function __construct($dataDir, $packageDir, $yamlCompiler, $fileSystem)
    {
        $this->dataDir = $dataDir;
        $this->packageDir = $packageDir;
        $this->yamlCompiler = $yamlCompiler;
        $this->fileSystem = $fileSystem;
    }

    public function loadPackageData()
    {
        $content;
        $finder = new Finder();
        $finder->files()->name('package.yml')->in($this->packageDir);

        foreach ($finder as $file)
        {
            $content =  $content . "\r\n\r\n" . $file->getContents();
            $packageData = $this->yamlCompiler->yamlToArray($file->getContents());
            $this->yamlCompiler->writeFile($this->dataDir . 'packages.yml', $content, true);
        }

        return "success";
    }
}