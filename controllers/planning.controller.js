const mongoose = require('mongoose'); // Add this line to import mongoose
  const Planning = require('../models/planning.model');
  const Jour = require('../models/jour.model');

  exports.createPlanningWithJours = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { intitule, jours } = req.body;

      // Création du planning
      const newPlanning = await Planning.create([{ intitule }], { session });

      // Création des jours associés au planning
      const joursCreated = await Jour.create(
        jours.map((jour) => ({
          ...jour,
          id_planning: newPlanning[0]._id
        })),
        { session }
      );

      await session.commitTransaction();
      res.status(201).json({
        message: 'Planning and jours created successfully!',
        planning: newPlanning,
        jours: joursCreated
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ message: error.message });
    } finally {
      session.endSession();
    }
  };

  exports.getAllPlannings = async (req, res) => {
    try {
      const plannings = await Planning.find();
      res.status(200).json(plannings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getPlanningById = async (req, res) => {
    try {
      const planning = await Planning.findById(req.params.id);
      if (!planning) {
        return res.status(404).json({ message: 'Planning not found' });
      }
      res.status(200).json(planning);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updatePlanning = async (req, res) => {
    try {
      const planning = await Planning.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!planning) {
        return res.status(404).json({ message: 'Planning not found' });
      }
      res.status(200).json(planning);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deletePlanning = async (req, res) => {
    try {
      await Planning.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
