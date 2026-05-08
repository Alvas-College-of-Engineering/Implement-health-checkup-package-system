package com.health.checkup.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "health_package")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class HealthPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "package_name", nullable = false, unique = true)
    private String packageName;

    @Column(name = "description")
    private String description;

    @Column(name = "cost", nullable = false)
    private Double cost;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private PackageCategory category;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "package_test", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "test_name")
    private List<String> testsIncluded = new ArrayList<>();

    public enum PackageCategory { BASIC, STANDARD, PREMIUM }
}
