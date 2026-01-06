# Expression Atlas Dataset Configuration (datasets.json)

This document describes the structure and purpose of the dataset configuration file
used by the Expression Atlas / Gene Expression tools.

The configuration defines the available expression datasets, their supported data
types, and the backend endpoints required to retrieve metadata and expression matrices.
It enables the frontend application to dynamically resolve API routes without
hardcoding dataset-specific logic.

---

## Purpose

This file serves as a centralized registry of expression datasets available in the
application. Each dataset represents a biological source or organism and defines
the expression data types supported for that dataset.

The configuration is designed to be consumed by visualization components such as
heatmaps, expression charts, and gene-level views.

---

## Dataset Definition

Each dataset entry includes:

- A unique internal identifier
- A human-readable database or organism name
- One or more supported expression data types
- API endpoints for metadata and expression matrices

---

## Field Description

### Identifier

The `id` field uniquely identifies a dataset within the application. It is used
internally to reference and resolve dataset-specific configuration.

---

### Database

The `database` field provides a descriptive name for the dataset or organism.
It is intended for display purposes within the user interface.

---

### Types

The `types` field defines the expression data types supported by the dataset.
Each type represents a distinct biological or analytical category, such as
genes or non-coding RNAs.

Each type configuration includes:

- A display title
- A metadata endpoint
- One or more expression matrix endpoints

---

### Title

The `title` field defines the human-readable name of a specific expression type
and version. It is used for labeling and contextual information in the UI.

---

### Metadata Endpoint

The `metadata` field specifies the API endpoint used to retrieve descriptive
information related to the expression data, such as samples, conditions, or
experimental annotations.

---

### Expression Matrices

The `matrices` field defines the available expression value representations for
a given type. Each matrix corresponds to a specific normalization or processing
strategy and resolves to a backend API endpoint.

The application uses these endpoints to retrieve expression values for
visualization and analysis.

---

## Design Considerations

- The configuration is declarative and contains no application logic.
- API endpoints are resolved dynamically based on this configuration.
- The structure supports multiple data types per dataset.
- Additional matrix representations or data types can be added without modifying
  frontend components.

---

## Maintenance Notes

This file should be updated whenever new expression datasets, data types, or
matrix representations are introduced. Consistency between the configuration
and the backend API is required to ensure correct data retrieval.
