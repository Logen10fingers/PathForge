import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Heading } from "@chakra-ui/react";

const COLORS = ["#3182ce", "#63b3ed", "#90cdf4", "#bee3f8", "#ebf8ff"];

const ProfileAnalyticsChart = ({ data }) => {
  return (
    <Box p={6} bg="gray.50" borderRadius="md" boxShadow="md" mb={8}>
      <Heading as="h3" size="md" mb={4}>
        Profile Analytics by Skill
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="skill"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#3182ce"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProfileAnalyticsChart;
