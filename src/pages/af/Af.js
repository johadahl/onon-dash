import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

const datatableData = [
  ["1", "VW-Syd", "Helsingborg", "40330", "38", "100%", "+3"],
  ["2", "Norrbil", "Norrtälje", "40400", "14", "100%", "+5"],
  ["3", "Sydbil", "Sydtälje", "40400", "14", "90%", "-1"],
];

const columns = [{
  name: "rank",
  label: "Rank",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "company",
  label: "Företag",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "place",
  label: "Ort",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "id",
  label: "ÅF-Nummer",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "responses",
  label: "Antal svar",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "score",
  label: "Resultat",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "trend",
  label: "Trend",
  options: {
    filter: true,
    sort: true,}},
];

const options = {
  selectableRows:'none',
  print:false,
  pagination:false,
  viewColumns:false,  
};

export default function Rank() {
  return (
    <>
      <PageTitle title="Offertuppföljning" />
      <Grid container spacing={7}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Ranking av Återförsäljare"
            data={datatableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
