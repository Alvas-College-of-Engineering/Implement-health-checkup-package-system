package com.health.checkup.repository;

import com.health.checkup.model.HealthPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthPackageRepository extends JpaRepository<HealthPackage, Long> {}
