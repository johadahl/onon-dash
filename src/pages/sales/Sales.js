import React from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";

// Mock data
const datatableData = [
  ["1", "Rolf Thomander", "11001", "Stockholm", "38", "100%", "+1"],
  ["2", "Pontus Karlsson", "40330", "Helsingborg", "15", "99%", "+3"],
  ["3", "Martin Roxtröm", "40993", "Smista", "12", "90%", "+5"],
];

// Table settings
const columns = [{
  name: "rank",
  label: "Rank",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "name",
  label: "Namn",
  options: {
    filter: true,
    sort: true,}},
  {
  name: "afid",
  label: "ÅF-Nummer",
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
            title="Ranking av Säljare"
            data={datatableData}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  );
}
