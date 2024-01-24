const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Includes
const head = fs.readFileSync("src/includes/head.html");
const sectionHeader = fs.readFileSync("src/includes/sectionHeader.html");
const sectionFooter = fs.readFileSync("src/includes/sectionFooter.html");
const breadcrumbs = fs.readFileSync("src/includes/breadcrumbs.html");
const temp = fs.readFileSync("src/includes/temp.html");

// Pages
module.exports = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "index.html",
    inject: "body",
    title: "Index page",
    head,
    sectionHeader,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/zayavka.html",
    filename: "zayavka.html",
    inject: "body",
    title: "Заявка на тех. присоединение",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/services.html",
    filename: "services.html",
    inject: "body",
    title: "Услуги",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/contacts.html",
    filename: "contacts.html",
    inject: "body",
    title: "Контакты",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/rent.html",
    filename: "rent.html",
    inject: "body",
    title: "Аренда техники",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/rent-detail.html",
    filename: "rent-detail.html",
    inject: "body",
    title: "Аренда техники - деталка",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/service.html",
    filename: "service.html",
    inject: "body",
    title: "Обслуживание электрооборудования",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/construction.html",
    filename: "construction.html",
    inject: "body",
    title: "Строительство электросетевых объектов",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/docs.html",
    filename: "docs.html",
    inject: "body",
    title: "Выдача документации",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/organisation.html",
    filename: "organisation.html",
    inject: "body",
    title: "Организация наружного освещения",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/404.html",
    filename: "404.html",
    inject: "body",
    title: "Страница не найдена",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
  new HtmlWebpackPlugin({
    template: "./src/pages/about.html",
    filename: "about.html",
    inject: "body",
    title: "О компании",
    head,
    sectionHeader,
    breadcrumbs,
    sectionFooter,
    temp,
  }),
];