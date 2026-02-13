# Android Linting Guide

This document defines linting, formatting, and static analysis rules for Android projects.
The goal is to ensure **consistent style**, **maintainability**, and **early detection of issues**, with CI enforcement where appropriate.

---

## Linting with Android Lint

Use **Android Lint**, along with **ktlint** and **Detekt**, to enforce style rules and catch common issues across all Android modules.

Lint checks are executed:
- Inside **Android Studio**
- During **Gradle builds**
- As part of **CI pipelines**

---

## Lint Rules Overview

| Rule Nr | Type | Priority | Description |
|------|------|----------|-------------|
| AND-LINT-01 | TOOLING, STYLE | M | Enable Android Lint for all modules, including test sources. |
| AND-LINT-02 | TOOLING, STYLE | M | Enforce rules for imports, unused code, complexity, and file size. |
| AND-LINT-03 | TOOLING, STYLE | R | Configure severities to fail CI on critical violations while allowing warnings for stylistic rules. |

---

## Android Lint Configuration

Android Lint is configured via a `lint.xml` file placed at the project root.

### Example: `lint.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<lint>
    <!-- Disabled or handled by formatter -->
    <issue id="TodoComment" severity="ignore" />
    <issue id="Whitespace" severity="ignore" />

    <!-- Correctness & safety -->
    <issue id="UnusedImports" severity="error" />
    <issue id="NewApi" severity="error" />
    <issue id="HardcodedText" severity="warning" />

    <!-- Maintainability -->
    <issue id="MethodLength" severity="warning" />
    <issue id="CyclomaticComplexity" severity="warning" />
</lint>
```

---

## Baseline Configuration

To prevent existing technical debt from breaking builds, use a **lint baseline**.

Generate baseline:

```bash
./gradlew lintDebug --baseline lint-baseline.xml
```

Configure it in `build.gradle`:

```gradle
android {
    lint {
        baseline = file("lint-baseline.xml")
    }
}
```

---

## Rule Severity Strategy

| Severity | Behavior |
|--------|----------|
| Error | Fails CI |
| Warning | Logged but allowed |
| Informational | Developer visibility only |

Recommended:
- Correctness, security → **error**
- Complexity, size → **warning**
- Formatting → handled by **ktlint**

---

## Line Length & Formatting

Android Lint does not enforce line length by default.

Use **ktlint** for formatting rules.

Recommended configuration:
- Maximum line length: **120**
- Ignore comments and URLs

---

## Function & Class Size

Use **Detekt** for Kotlin-specific complexity analysis.

Recommended thresholds:
- Function length: Warning 60 / Error 100
- Class length: Warning 300 / Error 500
- Cyclomatic complexity: Warning 12 / Error 20

---

## Included & Excluded Paths

### Included
- `src/main`
- `src/test`
- `src/androidTest`

### Excluded
- `build/`
- `generated/`
- `lint-baseline.xml`

```gradle
lint {
    checkDependencies = true
    ignoreTestSources = false
}
```

---

## Running Lint in CI

```bash
./gradlew lint
```

Fail build on violations:

```gradle
lint {
    abortOnError = true
    warningsAsErrors = true
}
```

---

## Imports & Module Structure

Rules:
- No wildcard imports
- Remove unused imports
- Prefer explicit dependencies
- Enforce module boundaries

Import order:
1. Kotlin / Java standard library
2. Android framework
3. Third-party libraries
4. Local modules

```kotlin
import kotlin.collections.List

import android.content.Context
import android.view.View

import androidx.lifecycle.ViewModel

import com.example.designsystem.Button
import com.example.core.network.ApiClient
```

---

## Comments & Documentation

Guidelines:
- Use **KDoc (`/** */`)** for public APIs
- Explain **why**, not **what**
- Avoid redundant comments

```kotlin
/**
 * Handles user authentication and token refresh.
 * Network failures are retried with exponential backoff.
 */
class AuthRepository
```

---

## Code Organization Markers

```kotlin
// region View
// region Networking
// region Serialization
```

Prefer package-level separation over large files.

---

## Summary

This lint setup provides:
- Consistent coding standards
- Improved readability and maintainability
- Early bug detection
- CI-enforced quality gates

Using **Android Lint + ktlint + Detekt** provides parity with **SwiftLint + SwiftFormat** on iOS.
