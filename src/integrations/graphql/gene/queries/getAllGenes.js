/**
 * GraphQL query definition.
 *
 * Defines the query used to retrieve a paginated collection of genes.
 * * - all genes (`GET_GENE_ALL`)
 */

// third party
import { gql } from "@apollo/client";

export const GET_GENE_ALL = gql`
  query GetAllGenes($limit: Int, $page: Int) {
    getAllGenes(limit: $limit, page: $page) {
      data {
        _id
        gene {
          accessionId
          name
        }
        chromosome {
          name
        }
        organism {
          _id
          name
        }
      }
      pagination {
        totalResults
        limit
        currentPage
        hasNextPage
      }
    }
  }
`;
