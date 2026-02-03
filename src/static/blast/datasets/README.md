# BLAST Dataset Registry (`datasets.json`)

This file defines the available BLAST datasets exposed by the BLAST API.

Each entry represents an organism and lists the nucleotide and/or protein BLAST
databases that can be queried through the API.

The configuration is used as a lookup table to resolve valid organisms and
BLAST database identifiers without hardcoding them in the application logic.

---

## Structure

The file contains an array of dataset objects.

Each dataset object includes:

- An organism name
- One or more nucleotide BLAST databases
- One or more protein BLAST databases

---

## Fields

### organism

Human-readable name of the organism or reference assembly.

---

### nucleotide

List of nucleotide BLAST databases available for the organism.

Each entry includes:

- `title`: Display name of the database
- `database`: BLAST database identifier

---

### protein

List of protein BLAST databases available for the organism.

Each entry includes:

- `title`: Display name of the database
- `database`: BLAST database identifier

---

## Notes

- The file is declarative and contains no application logic.
- Database identifiers must match existing BLAST databases.
- This file is consumed by the BLAST API to validate and resolve queries.
