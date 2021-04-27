const seed = require('../../../script/seed');
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest');
const { db, Galaxy } = require('../db');
