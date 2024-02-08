export interface IssueNode {
  id: string;
  title: string;
  number: string;
  url: string;
  createdAt: string;
}

export interface IssueEdge {
  node: IssueNode;
}

export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

export interface QueryData {
  repository: {
    issues: {
      edges: IssueEdge[];
      pageInfo: PageInfo; // Include pageInfo in your type definition
    };
  };
}
