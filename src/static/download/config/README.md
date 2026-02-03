# Download Dataset Configuration (`downloads.json`)

This document describes the structure and purpose of the dataset download configuration
file used by the platform to expose biological data files for download.

The configuration defines the available organisms, the files associated with each
organism, and the metadata required to present and resolve downloadable resources
through the API and frontend applications.

This file enables clients to dynamically discover available datasets and file types
without hardcoding file paths or filenames.

---

## Purpose

This file serves as a centralized registry of downloadable biological resources,
including genome sequences, annotations, transcripts, coding sequences, proteins,
and derived expression datasets.

Each entry represents a biological organism or reference assembly and defines the
set of files that can be retrieved by users through the download service.

The configuration is intended to be consumed by:

- Dataset download pages
- Programmatic download tools
- API endpoints that list or resolve available files

---

## Dataset Definition

Each dataset entry includes:

- A unique dataset identifier
- A human-readable organism name
- A filesystem-safe slug
- A list of downloadable files and their metadata

---

## Field Description

### Identifier

The `id` field uniquely identifies a dataset within the application.
It is used internally to reference a specific organism or reference assembly.

---

### Organism

The `organism` field provides the full scientific or descriptive name of the organism.
It is intended for display purposes within user interfaces.

---

### Slug

The `slug` field is a short, filesystem- and URL-safe identifier used to resolve
directory paths and construct download endpoints.

The slug typically corresponds to a directory name where the dataset files are stored.

---

### Files

The `files` field defines the set of downloadable resources available for the dataset.
Each file entry represents a single downloadable artifact.

---

## File Definition

Each file entry includes the following fields:

---

### Key

The `key` field is a short, stable identifier representing the biological or analytical
content of the file (e.g. `genome`, `annotations`, `cds`, `proteins`).

It is used internally for filtering, lookup, and programmatic access.

---

### Label

The `label` field provides a human-readable description of the file.
It is intended for display in download interfaces.

---

### Type

The `type` field specifies the file format or data type, such as:

- `FASTA`
- `GFF3`
- `CSV`

This field may be used to group or filter files by format.

---

### Compression

The `compression` field indicates whether the file is compressed and which compression
method is used (e.g. `gz`, `zip`).

This allows clients to anticipate decompression requirements.

---

### Filename

The `filename` field specifies the exact name of the downloadable file as stored
on disk or served by the backend.

This field is used to resolve the final download path.

---

### Size

The `sizeKB` field provides the approximate file size in kilobytes.
It is intended for informational and UI purposes only.

---

## Design Considerations

- The configuration is declarative and contains no application logic.
- File paths and filenames are resolved dynamically using this configuration.
- The structure supports multiple file types per organism.
- Additional datasets or files can be added without modifying frontend code.
- The configuration can be shared across services that require dataset discovery.

---

## Maintenance Notes

This file should be updated whenever new organisms, reference assemblies,
or downloadable files are added to the platform.

Consistency between the configuration and the underlying filesystem or storage
backend is required to ensure correct file resolution and downloads.
