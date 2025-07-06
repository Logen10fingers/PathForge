import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Box, Heading } from "@chakra-ui/react";

const SkillDistributionChart = ({ data }) => {
  return (
    <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md" mb={8}>
      <Heading as="h3" size="md" mb={4}>
        Skill Distribution by Category
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3182ce" name="Skills Count" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SkillDistributionChart;
