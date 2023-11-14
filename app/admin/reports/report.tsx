"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { ReportT } from "./report-type";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
    border: "1px solid #CCCCCC",
    borderRadius: 5,
  },
  topics: {
    fontSize: 14,
    marginVertical: 8,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
});

// Create Document Component
const GeneralReport = ({ data }: { data: ReportT | undefined }) => (
  <PDFViewer style={{ width: "100%", height: "100%" }}>
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
  </PDFViewer>
);

export default GeneralReport;
