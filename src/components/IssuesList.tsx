import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_ISSUES } from "../graphql/queries";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Link,
  Tabs,
  Tab,
  Container,
  Grid,
} from "@mui/material";
import { QueryData, IssueEdge } from "@/types/types";

const IssuesList: React.FC = () => {
  const [afterCursor, setAfterCursor] = useState<string | null>(null);
  const [previousCursors, setPreviousCursors] = useState<string[]>([]);
  const [tabValue, setTabValue] = useState<number>(0); // 0: Open, 1: Closed, 2: Both

  const { loading, error, data, fetchMore } = useQuery<QueryData>(
    GET_REPOSITORY_ISSUES,
    {
      variables: {
        name: "reactjs.org",
        owner: "reactjs",
        states:
          tabValue === 2
            ? ["OPEN", "CLOSED"]
            : [tabValue === 0 ? "OPEN" : "CLOSED"],
        after: afterCursor,
        first: 10,
      },
    }
  );

  useEffect(() => {
    setAfterCursor(null); // Reset the cursor for fresh start on tab change
    setPreviousCursors([]); // Clear the history of cursors on tab change
  }, [tabValue]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNextPage = () => {
    const endCursor = data?.repository.issues.pageInfo.endCursor;
    if (endCursor) {
      setPreviousCursors((prev) => [...prev, endCursor]);

      fetchMore({
        variables: {
          after: endCursor,
          first: 10,
        },
      });

      // Set afterCursor to the new endCursor
      setAfterCursor(endCursor);
    }
  };

  const handlePreviousPage = () => {
    // Handle moving back
    setPreviousCursors((prev) => {
      const newCursors = [...prev];
      newCursors.pop(); // Remove the last cursor
      const prevCursor =
        newCursors.length > 0 ? newCursors[newCursors.length - 1] : null;
      setAfterCursor(prevCursor); // Set the cursor to the last item in the updated array or null if empty
      return newCursors;
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            onChange={handleChangeTab}
            sx={{
              height: "fit-content",
              borderRight: 1,
              borderColor: "divider",
              pr: 2,
            }}
          >
            <Tab label="Open" />
            <Tab label="Closed" />
            <Tab label="Both" />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ marginLeft: "20px" }}>
              Reactjs.org Issues
            </Typography>
            <List>
              {loading && <CircularProgress />}
              {!loading && (!data || error) && (
                <Typography color="error">
                  Error loading issues. Please try again.
                </Typography>
              )}
              {data?.repository.issues.edges.map((edge: IssueEdge) => (
                <ListItem key={edge.node.id} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Link
                        href={edge.node.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                      >
                        #{edge.node.number}: {edge.node.title}
                      </Link>
                    }
                    secondary={`Created at: ${new Date(
                      edge.node.createdAt
                    ).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                pt: 2,
                borderTop: 1,
                borderColor: "divider",
              }}
            >
              <Button
                onClick={handlePreviousPage}
                disabled={previousCursors.length === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={!data?.repository.issues.pageInfo.hasNextPage}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IssuesList;
