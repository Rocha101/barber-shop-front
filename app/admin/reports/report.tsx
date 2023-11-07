import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ReportT } from "./report-type";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    width: "1000px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  topics: {
    fontSize: 12,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
});

// Create Document Component
const GeneralReport = ({ data }: { data: ReportT }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Relatório Barbearia - Vendas</Text>
        <Text style={styles.topics}>
          Total de vendas: {data?.totalSales || "Não informado"}
        </Text>
        <Text style={styles.topics}>
          Faturamento total: {data?.totalMoney || "Não informado"}
        </Text>
        <Text style={styles.topics}>
          Total de clientes: {data?.numberOfCustomers || "Não informado"}
        </Text>
      </View>
    </Page>
  </Document>
);

export default GeneralReport;
