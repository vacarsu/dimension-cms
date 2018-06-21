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
        $loadedPackages = $this->yamlCompiler->loadFile($this->dataDir . 'packages.yml');
        $finder->files()->name('package.yml')->in($this->packageDir);

        foreach ($finder as $file)
        {
            $packageData = $this->yamlCompiler->yamlToArray($file->getContents());
            if (!$this->determinePackageLoaded($packageData, $loadedPackages))
            {
                $content =  $content . "\r\n\r\n" . $file->getContents();
                $this->yamlCompiler->writeFile($this->dataDir . 'packages.yml', $content);
            }
        }

        return "success";
    }

    private function determinePackageLoaded($foundPackage, $loadedPackages)
    {
        $foundPackageName = key($foundPackage);
        return $loadedPackages[$foundPackageName] ? true : false;
    }
}