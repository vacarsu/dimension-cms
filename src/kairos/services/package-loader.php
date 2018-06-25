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
        $finder = new Finder();
        $loadedPackages = $this->yamlCompiler->loadFile($this->dataDir . 'packages.yml');
        $finder->files()->name('package.yml')->in($this->packageDir);
        foreach ($finder as $file)
        {
            $foundPackage = $this->yamlCompiler->yamlToArray($file->getContents());
            if (!$this->determinePackageLoaded($foundPackage, $loadedPackages))
            {
                $loadedPackages[] = $foundPackage;
                $this
                    ->yamlCompiler
                    ->writeFile(
                        $this->dataDir . 'packages.yml', "\r\n" . $file->getContents(),
                        true
                    );
                $this->loadPackageModules($foundPackage);
            }
        }
    }

    private function determinePackageLoaded($foundPackage, $loadedPackages)
    {
        $foundPackageName = key($foundPackage);
        $foundPackageVersion = $foundPackage[$foundPackageName]['version'];
        $loadedPackageVersion = $loadedPackages[$foundPackageName]['version'];
        var_dump($foundPackageName);
        var_dump($foundPackageVersion);
        var_dump($loadedPackageVersion);
        if ($loadedPackages[$foundPackageName] && $loadedPackageVersion === $foundPackageVersion)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    private function loadPackageModules($foundPackage)
    {
        $packageName = key($foundPackage);
        $finder = new Finder();
        $finder->files()->name('*.yml')->in($this->packageDir . $packageName . '/data');

        foreach ($finder as $file)
        {
            $moduleData = $this->yamlCompiler->yamlToArray($file->getContents());
            $moduleFileName = $file->getFilename();
            $this->fileSystem->mkdir($this->dataDir . $packageName);
            $this
                ->yamlCompiler
                ->writeFile(
                    $this->dataDir . $packageName . '/' . $moduleFileName, "\r\n" . $file->getContents(),
                    false
                );
        }
    }
}