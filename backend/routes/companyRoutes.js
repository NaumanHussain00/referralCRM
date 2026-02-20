const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// GET /api/companies - Get all companies with stats
router.get("/", companyController.getAllCompanies);

// GET /api/companies/:id - Get single company
router.get("/:id", companyController.getCompanyById);

// POST /api/companies - Create new company
router.post("/", companyController.createCompany);

// DELETE /api/companies/:id - Delete company
router.delete("/:id", companyController.deleteCompany);

// POST /api/companies/:id/fetch-profiles - Fetch LinkedIn profiles via SerpAPI
router.post("/:id/fetch-profiles", companyController.fetchProfiles);

module.exports = router;
