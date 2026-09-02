// ============================================================================
// JOUST.LIFE - IRONCLAD ZERO-DEATH APEX SWOOP CONTROLLER
// Deep Q-Network (DQN) + Active Lethal Threat Filter + Reflexive Evasion Shield,
// Precision Terrain Clearance, Parabolic Swoops, and Unbreakable Altitude Hegemony.
// ============================================================================

(function () {
  'use strict';

  // Clean up any previously running instance
  if (window.__joustQBot) {
    try {
      window.__joustQBot.destroy();
    } catch (e) {
      console.warn('[Q-Bot] Error destroying old instance:', e);
    }
  }

  // ==========================================================================
  // CONFIGURATION & HYPERPARAMETERS
  // ==========================================================================
  const DEFAULT_PRETRAINED_MODEL = {"stateDim":128,"actionDim":7,"h1Size":128,"h2Size":64,"predDim":32,"l1":{"w":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"b":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"l2":{"w":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"b":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]},"l3":{"w":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"b":[null,null,null,null,null,null,null]},"l3_pred":{"w":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],"b":[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]}};

  const CONFIG = {
    // Action & Timing
    decisionIntervalMs: 30,     // Ultra-responsive 33.3Hz evaluation
    minDirHoldMs: 0,            // Zero latency immediate steering
    minFlapIntervalMs: 50,      // Crisp impulse cadence
    flapPulseDurationMs: 40,    // Wing flap impulse duration
    lookaheadTicks: 12,         // Forward physics simulation horizon

    // Ironclad Zero-Death Safety Parameters
    lethalThreatRadiusX: 85,    // Horizontal danger radius where overhead enemies trigger emergency evasion
    lethalThreatRadiusY: 100,   // Vertical danger radius above our bird
    minSafeAltitudeAdvantage: 6, // Min height advantage (px) required to engage in an offensive swoop

    // Swoop Flight Dynamics
    apexCruisingMinY: 46,       // Golden apex thermal soaring band min Y
    apexCruisingMaxY: 120,      // Golden apex thermal soaring band max Y
    swoopAcquisitionDy: 12,     // Min altitude delta to initiate predatory swoop
    swoopLeadTicks: 8,          // Lead-aiming horizon for dynamic intercept
    comboWindowMs: 4000,        // Time window to chain multi-frag swoop sweeps

    // Terrain & Boundary Safety Buffers
    ceilingSafeY: 40,           // Flap inhibitor above this altitude
    floorSafeY: 55,             // Recovery flap before bottom lava
    platformUnderBuffer: 20,    // Platform underhead flap inhibitor buffer
    lethalDiveXThreshold: 40,   // Horizontal strike alignment window (in pixels)

    // Training & Optimization
    trainBatchSize: 32,         // Mini-batch size for Adam SGD updates
    trainFrequencyTicks: 2,     // Train every N decision steps
    gamma: 0.975,               // Discount factor
    learningRate: 0.0018,       // Adam learning rate
    targetSyncTau: 0.015,       // Polyak soft target network update rate
    replayCapacity: 20000,      // Transitions in experience replay buffer
    minReplayBeforeTrain: 64,   // Transitions before training begins

    // Exploration
    epsilonInitial: 0.16,       // Starting exploration rate
    epsilonMin: 0.02,           // Minimum exploration rate
    epsilonDecay: 0.99985,      // Per-step epsilon decay
    predatorExplorationRatio: 0.8, // Bias exploration towards safe lethal maneuvers

    // Dimensions (128-Feature Threat-Invariant Omni-Predator Tensor)
    stateDim: 128,
    actionDim: 7,
    h1Size: 128,
    h2Size: 64,
    predDim: 32,

    // Storage
    storageKey: 'joust_q_learning_apex_v5',
    autoSaveIntervalMs: 25000,
  };

  // Actions enumeration
  const ACTIONS = {
    IDLE: 0,
    LEFT: 1,
    RIGHT: 2,
    FLAP: 3,
    LEFT_FLAP: 4,
    RIGHT_FLAP: 5,
    STOP: 6,
  };

  const ACTION_NAMES = [
    'IDLE',
    'LEFT',
    'RIGHT',
    'FLAP',
    'L+FLAP',
    'R+FLAP',
    'STOP',
  ];

  // ==========================================================================
  // PREDICTIVE FORWARD PHYSICS SIMULATOR & ZERO-DEATH RAYCASTER
  // ==========================================================================
  class PhysicsPredictor {
    constructor() {
      this.g = 0.15;
      this.xA = 0.25;
      this.xS = 2.5;
      this.yS = -1.5;
      this.w = 16;
      this.h = 20;
    }

    simStep(x, y, vx, vy, ax, doFlap, worldWidth, worldHeight, platforms) {
      const W = worldWidth - 16;
      const H = worldHeight;

      vy += this.g;
      vx += ax;
      if (vx > this.xS) vx = this.xS;
      if (vx < -this.xS) vx = -this.xS;

      if (doFlap) {
        vy += this.yS;
        if (vy < this.yS * 4) vy = this.yS * 4;
      }

      x += vx;
      y += vy;

      if (x > W) x -= W;
      if (x < 0) x += W;

      let collision = false;
      let grounded = false;
      let bonkCeiling = false;
      let bonkFloor = false;
      let bonkUnderhead = false;
      let bonkSide = false;

      if (y > H) {
        y = H;
        vy = 0;
        grounded = true;
        collision = true;
        bonkFloor = true;
      } else if (y < 0) {
        y = 0;
        vy *= -0.5;
        collision = true;
        bonkCeiling = true;
      }

      if (platforms) {
        for (let i = 0; i < platforms.length; i++) {
          const p = platforms[i];
          const px1 = p.x1 !== undefined ? p.x1 : p.x;
          const px2 = p.x2 !== undefined ? p.x2 : p.x + 80;
          const py1 = p.y1 !== undefined ? p.y1 : p.y;
          const py2 = p.y2 !== undefined ? p.y2 : p.y + 12;

          if (x + this.w > px1 && x < px2 && y + this.h > py1 && y < py2) {
            if (vy > 0 && (y - vy + this.h) < py1) {
              y = py1 - this.h - 0.1;
              vy = 0;
              grounded = true;
              continue;
            }
            if (x < px1 || x + this.w > px2) {
              x -= vx;
              vx = -vx / 2;
              bonkSide = true;
            } else {
              y -= vy;
              vy = -vy / 2;
              bonkUnderhead = true;
            }
            collision = true;
          }
        }
      }

      return { x, y, vx, vy, grounded, collision, bonkCeiling, bonkFloor, bonkUnderhead, bonkSide };
    }

    predictMe(me, ax, doFlap, ticks, worldWidth, worldHeight, platforms) {
      let x = me.x;
      let y = me.y;
      let vx = me.vx || 0;
      let vy = me.vy || 0;
      const trajectory = [{ x, y, vx, vy }];
      let willCollide = false;

      for (let t = 0; t < ticks; t++) {
        const flapNow = (t === 0 && doFlap);
        const next = this.simStep(x, y, vx, vy, ax, flapNow, worldWidth, worldHeight, platforms);
        x = next.x;
        y = next.y;
        vx = next.vx;
        vy = next.vy;
        if (next.collision && !next.grounded) willCollide = true;
        trajectory.push({ x, y, vx, vy, grounded: next.grounded });
      }

      return {
        trajectory,
        endX: x,
        endY: y,
        endVx: vx,
        endVy: vy,
        willCollide,
      };
    }

    predictEnemy(en, ticks, worldWidth, worldHeight, platforms) {
      let x = en.x;
      let y = en.y;
      let vx = en.vx || 0;
      let vy = en.vy || 0;
      const trajectory = [{ x, y, vx, vy }];

      for (let t = 0; t < ticks; t++) {
        const flapProb = vy > 1.2 ? 0.35 : 0.05;
        const doFlap = Math.random() < flapProb;
        const ax = en.facingRight ? 0.08 : -0.08;
        const next = this.simStep(x, y, vx, vy, ax, doFlap, worldWidth, worldHeight, platforms);
        x = next.x;
        y = next.y;
        vx = next.vx;
        vy = next.vy;
        trajectory.push({ x, y, vx, vy });
      }

      return {
        trajectory,
        endX: x,
        endY: y,
        endVx: vx,
        endVy: vy,
      };
    }

    calculateInterceptPoint(me, target, W, H) {
      const maxTicks = CONFIG.swoopLeadTicks;
      let bestT = 6;
      let targetFutureX = target.x + (target.vx || 0) * bestT;
      let targetFutureY = target.y + (target.vy || 0) * bestT + 0.5 * this.g * bestT * bestT;

      const w = W - 16;
      if (targetFutureX > w) targetFutureX -= w;
      if (targetFutureX < 0) targetFutureX += w;
      targetFutureY = Math.max(30, Math.min(H - 45, targetFutureY));

      return { x: targetFutureX, y: targetFutureY, leadTicks: bestT };
    }

    checkActionCollisionRisk(me, action, ticks, worldWidth, worldHeight, platforms) {
      let ax = 0;
      if (action === ACTIONS.LEFT || action === ACTIONS.LEFT_FLAP) ax = -0.25;
      else if (action === ACTIONS.RIGHT || action === ACTIONS.RIGHT_FLAP) ax = 0.25;
      const doFlap = (action === ACTIONS.FLAP || action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP);

      const H = worldHeight;
      let x = me.x;
      let y = me.y;
      let vx = me.vx || 0;
      let vy = me.vy || 0;

      let bonkRisk = 0;

      for (let t = 0; t < ticks; t++) {
        const flapNow = (t === 0 && doFlap);
        const next = this.simStep(x, y, vx, vy, ax, flapNow, worldWidth, worldHeight, platforms);
        x = next.x;
        y = next.y;
        vx = next.vx;
        vy = next.vy;

        if (y < 28) bonkRisk += (28 - y) * 1.5;
        if (y > H - 55) bonkRisk += (y - (H - 55)) * 1.5;
        if (next.bonkUnderhead) bonkRisk += 25.0;
        if (next.bonkSide) bonkRisk += 20.0;
        if (next.bonkCeiling) bonkRisk += 30.0;
      }

      return bonkRisk;
    }

    // Ironclad Zero-Death Lethal Danger Raycaster
    checkActionLethalDanger(me, action, enemies, ticks, worldWidth, worldHeight, platforms) {
      if (!enemies || enemies.length === 0) return { lethalDanger: false, dangerScore: 0 };

      let ax = 0;
      if (action === ACTIONS.LEFT || action === ACTIONS.LEFT_FLAP) ax = -0.25;
      else if (action === ACTIONS.RIGHT || action === ACTIONS.RIGHT_FLAP) ax = 0.25;
      const doFlap = (action === ACTIONS.FLAP || action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP);

      const W = worldWidth - 16;
      let x = me.x;
      let y = me.y;
      let vx = me.vx || 0;
      let vy = me.vy || 0;

      let dangerScore = 0;
      let lethalDanger = false;

      for (let t = 0; t < ticks; t++) {
        const flapNow = (t === 0 && doFlap);
        const next = this.simStep(x, y, vx, vy, ax, flapNow, worldWidth, worldHeight, platforms);
        x = next.x;
        y = next.y;
        vx = next.vx;
        vy = next.vy;

        for (let e = 0; e < enemies.length; e++) {
          const en = enemies[e];
          if (!en || en.dead) continue;

          let enX = en.x + (en.vx || 0) * t;
          let enY = en.y + (en.vy || 0) * t + 0.5 * 0.15 * t * t;
          if (enX > W) enX -= W;
          if (enX < 0) enX += W;

          let dx = enX - x;
          if (dx > W / 2) dx -= W;
          if (dx < -W / 2) dx += W;
          const absDx = Math.abs(dx);
          const dy = enY - y; // Positive = enemy is below us (we win), Negative = enemy is above us (Lethal!)

          if (absDx < 22 && Math.abs(dy) < 22) {
            if (dy < -4.5) {
              // ENEMY IS HIGHER BY > 4.5px: FATAL COLLISION!
              lethalDanger = true;
              dangerScore += 2000.0;
            } else if (Math.abs(dy) <= 4.5) {
              // Level collision risk
              dangerScore += 60.0;
            }
          } else if (absDx < 50 && dy < -5) {
            dangerScore += (50 - absDx) * 3.0;
          }
        }
      }

      return { lethalDanger, dangerScore };
    }
              // 3.0-Second (100-Tick) Deep Macro-Trajectory Forecaster
    simulateMacro3Seconds(me, enemies, W, H, platforms) {
      if (!me || me.dead) return null;

      const ticks = 100;
      const w = W - 16;

      const candidateMacroStyles = [
        { name: "APEX_SOAR", ax: me.vx >= 0 ? 0.08 : -0.08, flapInterval: 15 },
        { name: "SWEEP_LEFT", ax: -0.25, flapInterval: 25 },
        { name: "SWEEP_RIGHT", ax: 0.25, flapInterval: 25 },
        { name: "FAST_CLIMB", ax: 0, flapInterval: 8 },
      ];

      const playerMacroPredictions = [];

      for (let s = 0; s < candidateMacroStyles.length; s++) {
        const style = candidateMacroStyles[s];
        let px = me.x;
        let py = me.y;
        let pvx = me.vx || 0;
        let pvy = me.vy || 0;
        const traj = [{ x: px, y: py, vx: pvx, vy: pvy, t: 0 }];

        for (let t = 1; t <= ticks; t++) {
          const doFlap = (t % style.flapInterval === 0 && py > 55);
          const next = this.simStep(px, py, pvx, pvy, style.ax, doFlap, W, H, platforms);
          px = next.x;
          py = next.y;
          pvx = next.vx;
          pvy = next.vy;
          traj.push({ x: px, y: py, vx: pvx, vy: pvy, t, grounded: next.grounded });
        }

        playerMacroPredictions.push({
          style: style.name,
          trajectory: traj,
          endX: px,
          endY: py
        });
      }

      const enemyMacroPredictions = [];
      const livingEnemies = (enemies || []).filter(e => e && !e.dead);

      for (let i = 0; i < livingEnemies.length; i++) {
        const en = livingEnemies[i];
        let ex = en.x;
        let ey = en.y;
        let evx = en.vx || 0;
        let evy = en.vy || 0;
        const traj = [{ x: ex, y: ey, vx: evx, vy: evy, t: 0 }];

        for (let t = 1; t <= ticks; t++) {
          const flapProb = (ey > 150 && evy > 0.8) ? 0.35 : 0.05;
          const doFlap = Math.random() < flapProb;
          const ax = (en.facingRight ? 0.08 : -0.08);
          const next = this.simStep(ex, ey, evx, evy, ax, doFlap, W, H, platforms);
          ex = next.x;
          ey = next.y;
          evx = next.vx;
          evy = next.vy;
          traj.push({ x: ex, y: ey, vx: evx, vy: evy, t });
        }

        enemyMacroPredictions.push({
          enemy: en,
          trajectory: traj,
          endX: ex,
          endY: ey
        });
      }

      let bestMacroPlan = playerMacroPredictions[0];
      let maxPredictedFrags = 0;
      let earliestKillTime = Infinity;

      for (let s = 0; s < playerMacroPredictions.length; s++) {
        const pPlan = playerMacroPredictions[s];
        let predictedKills = 0;
        let fatalRisk = false;

        for (let e = 0; e < enemyMacroPredictions.length; e++) {
          const ePred = enemyMacroPredictions[e];

          for (let t = 1; t <= ticks; t++) {
            const pPt = pPlan.trajectory[t];
            const ePt = ePred.trajectory[t];

            let dx = ePt.x - pPt.x;
            if (dx > w / 2) dx -= w;
            if (dx < -w / 2) dx += w;
            const absDx = Math.abs(dx);
            const dy = ePt.y - pPt.y;

            if (absDx < 22 && Math.abs(dy) < 22) {
              if (dy >= 6) {
                predictedKills++;
                if (t < earliestKillTime) earliestKillTime = t;
              } else if (dy < -5) {
                fatalRisk = true;
              }
            }
          }
        }

        pPlan.predictedKills = predictedKills;
        pPlan.hasFatalRisk = fatalRisk;

        if (!fatalRisk && predictedKills > maxPredictedFrags) {
          maxPredictedFrags = predictedKills;
          bestMacroPlan = pPlan;
        }
      }

      return {
        ticks,
        durationSeconds: 3.0,
        playerPlans: playerMacroPredictions,
        enemyPredictions: enemyMacroPredictions,
        optimalMacroPlan: bestMacroPlan,
        earliestKillTime: earliestKillTime === Infinity ? null : (earliestKillTime * 0.03).toFixed(2),
        maxPredictedFrags
      };
    }
    findBestFutureInterceptSpatiotemporal(me, target, W, H, platforms, lookaheadTicks = 20) {
      if (!me || !target || target.dead) return null;

      const w = W - 16;
      let bestT = null;
      let minGap = Infinity;
      let hasAdvantageAtIntercept = false;
      let interceptMeX = me.x;
      let interceptMeY = me.y;
      let interceptEnX = target.x;
      let interceptEnY = target.y;

      let px = me.x;
      let py = me.y;
      let pvx = me.vx || 0;
      let pvy = me.vy || 0;

      let ex = target.x;
      let ey = target.y;
      let evx = target.vx || 0;
      let evy = target.vy || 0;

      for (let t = 1; t <= lookaheadTicks; t++) {
        const pNext = this.simStep(px, py, pvx, pvy, 0, false, W, H, platforms);
        px = pNext.x;
        py = pNext.y;
        pvx = pNext.vx;
        pvy = pNext.vy;

        const eNext = this.simStep(ex, ey, evx, evy, 0, false, W, H, platforms);
        ex = eNext.x;
        ey = eNext.y;
        evx = eNext.vx;
        evy = eNext.vy;

        let dx = ex - px;
        if (dx > w / 2) dx -= w;
        if (dx < -w / 2) dx += w;
        const absDx = Math.abs(dx);
        const dy = ey - py;

        const gap = Math.hypot(absDx, Math.max(0, -dy));

        if (gap < minGap) {
          minGap = gap;
          bestT = t;
          hasAdvantageAtIntercept = (dy > 6);
          interceptMeX = px;
          interceptMeY = py;
          interceptEnX = ex;
          interceptEnY = ey;
        }

        if (absDx < 20 && dy >= 6) {
          return {
            converges: true,
            ticks: t,
            minGap: 0,
            hasAdvantage: true,
            interceptMeX: px,
            interceptMeY: py,
            interceptEnX: ex,
            interceptEnY: ey,
            isRightPlaceRightTime: true
          };
        }
      }

      return {
        converges: minGap < 40,
        ticks: bestT || lookaheadTicks,
        minGap,
        hasAdvantage: hasAdvantageAtIntercept,
        interceptMeX,
        interceptMeY,
        interceptEnX,
        interceptEnY,
        isRightPlaceRightTime: (minGap < 35 && hasAdvantageAtIntercept)
      };
    }
    getOverheadPlatformObstacle(me, platforms, W) {
      if (!platforms || platforms.length === 0 || !me) return { blocked: false, escapeDir: 0, waypointX: me ? me.x : 0, gap: Infinity };

      const meX = me.x;
      const meY = me.y;
      const w = W - 16;

      let nearestObs = null;
      let minGap = Infinity;

      for (let i = 0; i < platforms.length; i++) {
        const p = platforms[i];
        const px1 = p.x1 !== undefined ? p.x1 : p.x;
        const px2 = p.x2 !== undefined ? p.x2 : p.x + 80;
        const py1 = p.y1 !== undefined ? p.y1 : p.y;
        const py2 = p.y2 !== undefined ? p.y2 : p.y + 12;

        const overheadDy = meY - py2;
        if (overheadDy > -10 && overheadDy < 85) {
          let inSpan = (meX + 22 > px1 && meX - 6 < px2);
          if (!inSpan) {
            const wrapX = meX > w / 2 ? meX - w : meX + w;
            inSpan = (wrapX + 22 > px1 && wrapX - 6 < px2);
          }

          if (inSpan) {
            if (overheadDy < minGap) {
              minGap = overheadDy;
              nearestObs = { px1, px2, py1, py2 };
            }
          }
        }
      }

      if (nearestObs) {
        let dLeft = meX - (nearestObs.px1 - 24);
        let dRight = (nearestObs.px2 + 24) - meX;
        if (dLeft < 0) dLeft += w;
        if (dRight < 0) dRight += w;

        const escapeDir = dLeft < dRight ? -1 : 1;
        const waypointX = escapeDir === -1 ? (nearestObs.px1 - 24) : (nearestObs.px2 + 24);

        return {
          blocked: true,
          escapeDir,
          waypointX,
          py2: nearestObs.py2,
          gap: minGap
        };
      }

      return { blocked: false, escapeDir: 0, waypointX: meX, gap: Infinity };
    }
  }

  // ==========================================================================
  // LIGHTWEIGHT NEURAL NETWORK (Float32Array MLP + Adam Optimizer)
  // ==========================================================================
  class DenseLayer {
    constructor(inDim, outDim) {
      this.inDim = inDim;
      this.outDim = outDim;
      this.weights = new Float32Array(inDim * outDim);
      this.biases = new Float32Array(outDim);

      this.mW = new Float32Array(inDim * outDim);
      this.vW = new Float32Array(inDim * outDim);
      this.mB = new Float32Array(outDim);
      this.vB = new Float32Array(outDim);

      this.gradW = new Float32Array(inDim * outDim);
      this.gradB = new Float32Array(outDim);

      this.initHe();
    }

    initHe() {
      const scale = Math.sqrt(2.0 / this.inDim);
      for (let i = 0; i < this.weights.length; i++) {
        const u1 = Math.random() || 1e-7;
        const u2 = Math.random() || 1e-7;
        const randStd = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        this.weights[i] = randStd * scale;
      }
      this.biases.fill(0);
    }

    forward(input, output, isOutputLinear = false) {
      for (let j = 0; j < this.outDim; j++) {
        let sum = this.biases[j];
        const offset = j * this.inDim;
        for (let i = 0; i < this.inDim; i++) {
          sum += input[i] * this.weights[offset + i];
        }
        if (isOutputLinear) {
          output[j] = sum;
        } else {
          output[j] = sum > 0 ? sum : 0.05 * sum;
        }
      }
    }

    copyFrom(other) {
      this.weights.set(other.weights);
      this.biases.set(other.biases);
    }

    polyakUpdateFrom(other, tau) {
      const oneMinusTau = 1.0 - tau;
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] = oneMinusTau * this.weights[i] + tau * other.weights[i];
      }
      for (let i = 0; i < this.biases.length; i++) {
        this.biases[i] = oneMinusTau * this.biases[i] + tau * other.biases[i];
      }
    }

    applyAdam(lr, beta1, beta2, eps, t) {
      const fix1 = 1.0 - Math.pow(beta1, t);
      const fix2 = 1.0 - Math.pow(beta2, t);

      for (let i = 0; i < this.weights.length; i++) {
        const g = Math.max(-5.0, Math.min(5.0, this.gradW[i]));
        this.mW[i] = beta1 * this.mW[i] + (1 - beta1) * g;
        this.vW[i] = beta2 * this.vW[i] + (1 - beta2) * g * g;

        const mHat = this.mW[i] / fix1;
        const vHat = this.vW[i] / fix2;
        this.weights[i] -= (lr * mHat) / (Math.sqrt(vHat) + eps);
        this.gradW[i] = 0;
      }

      for (let i = 0; i < this.biases.length; i++) {
        const g = Math.max(-5.0, Math.min(5.0, this.gradB[i]));
        this.mB[i] = beta1 * this.mB[i] + (1 - beta1) * g;
        this.vB[i] = beta2 * this.vB[i] + (1 - beta2) * g * g;

        const mHat = this.mB[i] / fix1;
        const vHat = this.vB[i] / fix2;
        this.biases[i] -= (lr * mHat) / (Math.sqrt(vHat) + eps);
        this.gradB[i] = 0;
      }
    }
  }

  class QNetwork {
    constructor(stateDim = 128, actionDim = 7, h1Size = 128, h2Size = 64, predDim = 32) {
      this.stateDim = stateDim;
      this.actionDim = actionDim;
      this.h1Size = h1Size;
      this.h2Size = h2Size;
      this.predDim = predDim;

      this.l1 = new DenseLayer(stateDim, h1Size);
      this.l2 = new DenseLayer(h1Size, h2Size);
      this.l3 = new DenseLayer(h2Size, actionDim); // Policy Q-Values Head
      this.l3_pred = new DenseLayer(h2Size, predDim); // Future Kinematics World-Model Head

      this.h1 = new Float32Array(h1Size);
      this.h2 = new Float32Array(h2Size);
      this.out = new Float32Array(actionDim);
      this.predOut = new Float32Array(predDim);

      this.stepCount = 0;
    }

    predict(state, targetOutput = null) {
      const res = targetOutput || this.out;
      this.l1.forward(state, this.h1, false);
      this.l2.forward(this.h1, this.h2, false);
      this.l3.forward(this.h2, res, true);
      this.l3_pred.forward(this.h2, this.predOut, true);
      return res;
    }

    predictFuture(state) {
      this.predict(state);
      return this.predOut;
    }

    backward(state, action, tdError, targetFuture = null) {
      this.l1.forward(state, this.h1, false);
      this.l2.forward(this.h1, this.h2, false);
      this.l3.forward(this.h2, this.out, true);
      this.l3_pred.forward(this.h2, this.predOut, true);

      // 1. Q-Value Policy Gradient
      const dOut = new Float32Array(this.actionDim);
      dOut[action] = -Math.max(-5.0, Math.min(5.0, tdError));

      const dh2_q = new Float32Array(this.h2Size);
      for (let j = 0; j < this.actionDim; j++) {
        const delta = dOut[j];
        if (delta === 0) continue;
        this.l3.gradB[j] += delta;
        const offset = j * this.h2Size;
        for (let i = 0; i < this.h2Size; i++) {
          this.l3.gradW[offset + i] += delta * this.h2[i];
          dh2_q[i] += delta * this.l3.weights[offset + i];
        }
      }

      // 2. Future Position Prediction Gradient (World Model Supervised Backprop)
      const dh2_pred = new Float32Array(this.h2Size);
      if (targetFuture) {
        for (let k = 0; k < this.predDim; k++) {
          const predErr = this.predOut[k] - targetFuture[k];
          const grad = Math.max(-2.0, Math.min(2.0, predErr));
          this.l3_pred.gradB[k] += grad;
          const offset = k * this.h2Size;
          for (let i = 0; i < this.h2Size; i++) {
            this.l3_pred.gradW[offset + i] += grad * this.h2[i];
            dh2_pred[i] += grad * this.l3_pred.weights[offset + i];
          }
        }
      }

      // 3. Combined Multi-Task Latent Error Backpropagation
      const dh2 = new Float32Array(this.h2Size);
      for (let i = 0; i < this.h2Size; i++) {
        let totalDH2 = dh2_q[i] + 0.35 * dh2_pred[i];
        dh2[i] = this.h2[i] > 0 ? totalDH2 : 0.05 * totalDH2;
      }

      const dh1 = new Float32Array(this.h1Size);
      for (let j = 0; j < this.h1Size; j++) {
        const delta = dh2[j];
        this.l2.gradB[j] += delta;
        const offset = j * this.h1Size;
        for (let i = 0; i < this.h1Size; i++) {
          this.l2.gradW[offset + i] += delta * this.h1[i];
          dh1[i] += delta * this.l2.weights[offset + i];
        }
      }

      for (let i = 0; i < this.h1Size; i++) {
        if (this.h1[i] <= 0) dh1[i] *= 0.05;
      }

      for (let j = 0; j < this.h1Size; j++) {
        const delta = dh1[j];
        this.l1.gradB[j] += delta;
        const offset = j * this.stateDim;
        for (let i = 0; i < this.stateDim; i++) {
          this.l1.gradW[offset + i] += delta * state[i];
        }
      }
    }

    stepOptimizer(lr) {
      this.stepCount++;
      const beta1 = 0.9;
      const beta2 = 0.999;
      const eps = 1e-8;
      this.l1.applyAdam(lr, beta1, beta2, eps, this.stepCount);
      this.l2.applyAdam(lr, beta1, beta2, eps, this.stepCount);
      this.l3.applyAdam(lr, beta1, beta2, eps, this.stepCount);
      this.l3_pred.applyAdam(lr, beta1, beta2, eps, this.stepCount);
    }

    copyFrom(other) {
      this.l1.copyFrom(other.l1);
      this.l2.copyFrom(other.l2);
      this.l3.copyFrom(other.l3);
      if (other.l3_pred) this.l3_pred.copyFrom(other.l3_pred);
    }

    polyakUpdateFrom(other, tau) {
      this.l1.polyakUpdateFrom(other.l1, tau);
      this.l2.polyakUpdateFrom(other.l2, tau);
      this.l3.polyakUpdateFrom(other.l3, tau);
      if (other.l3_pred) this.l3_pred.polyakUpdateFrom(other.l3_pred, tau);
    }

    toJSON() {
      return {
        stateDim: this.stateDim,
        actionDim: this.actionDim,
        h1Size: this.h1Size,
        h2Size: this.h2Size,
        predDim: this.predDim,
        l1: { w: Array.from(this.l1.weights), b: Array.from(this.l1.biases) },
        l2: { w: Array.from(this.l2.weights), b: Array.from(this.l2.biases) },
        l3: { w: Array.from(this.l3.weights), b: Array.from(this.l3.biases) },
        l3_pred: { w: Array.from(this.l3_pred.weights), b: Array.from(this.l3_pred.biases) },
      };
    }

    fromJSON(data) {
      if (!data) return false;
      const l1W = data.l1 ? (data.l1.weights || data.l1.w) : null;
      const l1B = data.l1 ? (data.l1.biases || data.l1.b) : null;
      const l2W = data.l2 ? (data.l2.weights || data.l2.w) : null;
      const l2B = data.l2 ? (data.l2.biases || data.l2.b) : null;
      const l3W = data.l3 ? (data.l3.weights || data.l3.w) : null;
      const l3B = data.l3 ? (data.l3.biases || data.l3.b) : null;
      const l3PredW = data.l3_pred ? (data.l3_pred.weights || data.l3_pred.w) : null;
      const l3PredB = data.l3_pred ? (data.l3_pred.biases || data.l3_pred.b) : null;

      if (l1W && l1B && l2W && l2B && l3W && l3B) {
        if (l1W.length === this.l1.weights.length && l2W.length === this.l2.weights.length && l3W.length === this.l3.weights.length) {
          this.l1.weights.set(l1W);
          this.l1.biases.set(l1B);
          this.l2.weights.set(l2W);
          this.l2.biases.set(l2B);
          this.l3.weights.set(l3W);
          this.l3.biases.set(l3B);
          if (l3PredW && l3PredB && l3PredW.length === this.l3_pred.weights.length) {
            this.l3_pred.weights.set(l3PredW);
            this.l3_pred.biases.set(l3PredB);
          }
          return true;
        }
      }
      return false;
    }
  }

  // ==========================================================================
  // EXPERIENCE REPLAY BUFFER (WITH WORLD MODEL FUTURE TRAJECTORY TARGETS)
  // ==========================================================================
  class ReplayBuffer {
    constructor(capacity, stateDim = 128, predDim = 32) {
      this.capacity = capacity;
      this.stateDim = stateDim;
      this.predDim = predDim;
      this.states = new Float32Array(capacity * stateDim);
      this.nextStates = new Float32Array(capacity * stateDim);
      this.futureTargets = new Float32Array(capacity * predDim);
      this.actions = new Uint8Array(capacity);
      this.rewards = new Float32Array(capacity);
      this.dones = new Uint8Array(capacity);

      this.pointer = 0;
      this.size = 0;
    }

    push(state, action, reward, nextState, futureTarget, done) {
      const idx = this.pointer;
      const sOffset = idx * this.stateDim;
      const fOffset = idx * this.predDim;

      this.states.set(state, sOffset);
      this.nextStates.set(nextState, sOffset);
      if (futureTarget) {
        const len = Math.min(futureTarget.length, this.predDim);
        for (let i = 0; i < len; i++) {
          this.futureTargets[fOffset + i] = futureTarget[i];
        }
      }
      this.actions[idx] = action;
      this.rewards[idx] = reward;
      this.dones[idx] = done ? 1 : 0;

      this.pointer = (this.pointer + 1) % this.capacity;
      if (this.size < this.capacity) this.size++;
    }

    getFutureTarget(idx, out) {
      const fOffset = idx * this.predDim;
      const len = Math.min(out.length, this.predDim);
      for (let i = 0; i < len; i++) {
        out[i] = this.futureTargets[fOffset + i];
      }
    }

    sample(batchSize) {
      const indices = new Int32Array(batchSize);
      for (let i = 0; i < batchSize; i++) {
        indices[i] = Math.floor(Math.random() * this.size);
      }
      return indices;
    }

    getState(index, out) {
      const offset = index * this.stateDim;
      for (let i = 0; i < this.stateDim; i++) out[i] = this.states[offset + i];
    }

    getNextState(index, out) {
      const offset = index * this.stateDim;
      for (let i = 0; i < this.stateDim; i++) out[i] = this.nextStates[offset + i];
    }

    clear() {
      this.pointer = 0;
      this.size = 0;
    }
  }

  // ==========================================================================
  // JOUST ENVIRONMENT & ZERO-DEATH TARGET PICKER
  // ==========================================================================
  class JoustEnv {
    constructor() {
      this.predictor = new PhysicsPredictor();
      this.lastMyPrediction = null;
      this.lastEnemyPrediction = null;
      this.lockedTarget = null;
      this.threatEnemy = null;
      this.interceptPt = null;
      this.swoopChainTarget = null;
    }

    getMe() {
      if (typeof world === 'undefined') return null;
      return world.dude || null;
    }

    getSocket() {
      if (typeof socket !== 'undefined' && socket) return socket;
      if (typeof window.socket !== 'undefined' && window.socket) return window.socket;
      return null;
    }

    getEnemies() {
      const me = this.getMe();
      if (!me || typeof world === 'undefined' || !world.players) return [];
      const enemies = [];
      for (let i = 0; i < world.players.length; i++) {
        const p = world.players[i];
        if (p && p.id !== world.myId && p.team !== me.team && !p.dead) {
          enemies.push(p);
        }
      }
      return enemies;
    }

    shortestToroidalDx(fromX, toX, width) {
      const w = width - 16;
      let dx = toX - fromX;
      if (dx > w / 2) dx -= w;
      if (dx < -w / 2) dx += w;
      return dx;
    }

    getPlatformInfo(me, worldWidth, worldHeight) {
      if (typeof world === 'undefined' || !world.platform) {
        return { distBelow: 1.0, distCeil: me.y / worldHeight, distFloor: (worldHeight - me.y) / worldHeight };
      }

      let closestPlatBelow = worldHeight;
      const meX = me.x;
      const meY = me.y;
      const w = worldWidth - 16;

      for (let i = 0; i < world.platform.length; i++) {
        const p = world.platform[i];
        const px1 = p.x1 !== undefined ? p.x1 : p.x;
        const px2 = p.x2 !== undefined ? p.x2 : p.x + 80;
        const py1 = p.y1 !== undefined ? p.y1 : p.y;

        let inX = (meX + 16 > px1 && meX < px2);
        if (!inX) {
          const wrapX = meX > w / 2 ? meX - w : meX + w;
          inX = (wrapX + 16 > px1 && wrapX < px2);
        }

        if (inX && py1 >= meY + 20) {
          const dy = py1 - (meY + 20);
          if (dy < closestPlatBelow) closestPlatBelow = dy;
        }
      }

      return {
        distBelow: Math.min(1.0, closestPlatBelow / worldHeight),
        distCeil: Math.min(1.0, Math.max(0, meY / worldHeight)),
        distFloor: Math.min(1.0, Math.max(0, (worldHeight - meY) / worldHeight)),
      };
    }

        // Global Multi-Enemy Optimal Elimination Tour Solver (Branch-and-Bound / Dynamic Trajectory)
    computeOptimalEliminationTour(me, enemies, W, H, platforms) {
      if (!me || !enemies || enemies.length === 0) {
        this.optimalTour = [];
        this.optimalTourWaypoints = [];
        return [];
      }

      const livingEnemies = enemies.filter(e => e && !e.dead);
      if (livingEnemies.length === 0) {
        this.optimalTour = [];
        this.optimalTourWaypoints = [];
        return [];
      }

      if (livingEnemies.length === 1) {
        const target = livingEnemies[0];
        const intercept = this.predictor.calculateInterceptPoint(me, target, W, H);
        this.optimalTour = [target];
        this.optimalTourWaypoints = [
          { x: me.x, y: me.y },
          { x: intercept.x, y: intercept.y, target, seq: 1 }
        ];
        this.lockedTarget = target;
        this.interceptPt = intercept;
        return this.optimalTour;
      }

      // Sort candidate targets by combined distance and altitude advantage
      const sortedCandidates = livingEnemies.slice().sort((a, b) => {
        const da = Math.hypot(this.shortestToroidalDx(me.x, a.x, W), a.y - me.y);
        const db = Math.hypot(this.shortestToroidalDx(me.x, b.x, W), b.y - me.y);
        return da - db;
      }).slice(0, 5);

      const costBetween = (ax, ay, bx, by) => {
        const dx = Math.abs(this.shortestToroidalDx(ax, bx, W));
        const dy = by - ay; // Positive if B is below A (dive advantage)
        let flightTime = dx / 2.5;
        if (dy > 0) {
          flightTime += Math.sqrt(dy / 0.15) * 0.35; // Gravity assist
        } else {
          flightTime += Math.abs(dy) * 0.85 + 20; // Climbing penalty
        }
        return flightTime;
      };

      const n = sortedCandidates.length;
      let bestTour = [];
      let minCost = Infinity;
      const visited = new Array(n).fill(false);
      const currentTour = [];

      const searchTour = (lastX, lastY, currentCost, depth) => {
        if (currentCost >= minCost) return;
        if (depth === n || depth >= 3) {
          if (currentCost < minCost) {
            minCost = currentCost;
            bestTour = currentTour.slice();
          }
          return;
        }

        for (let i = 0; i < n; i++) {
          if (!visited[i]) {
            visited[i] = true;
            currentTour.push(sortedCandidates[i]);
            const nextCost = currentCost + costBetween(lastX, lastY, sortedCandidates[i].x, sortedCandidates[i].y);
            searchTour(sortedCandidates[i].x, sortedCandidates[i].y, nextCost, depth + 1);
            currentTour.pop();
            visited[i] = false;
          }
        }
      };

      searchTour(me.x, me.y, 0, 0);

      this.optimalTour = bestTour;
      const waypoints = [{ x: me.x, y: me.y }];
      for (let i = 0; i < bestTour.length; i++) {
        const t = bestTour[i];
        const prevPt = i === 0 ? me : bestTour[i - 1];
        const intPt = this.predictor.calculateInterceptPoint(prevPt, t, W, H);
        waypoints.push({ x: intPt.x, y: intPt.y, target: t, seq: i + 1 });
      }
      this.optimalTourWaypoints = waypoints;

      if (bestTour.length > 0) {
        this.lockedTarget = bestTour[0];
        this.interceptPt = waypoints[1] || null;
        this.swoopChainTarget = bestTour[1] || null;
      }

      return bestTour;
    }
        pickApexTarget(me, enemies, W, H) {
      if (!enemies || enemies.length === 0) {
        this.lockedTarget = null;
        this.threatEnemy = null;
        this.interceptPt = null;
        this.swoopChainTarget = null;
        return { target: null, threat: null, second: null };
      }

      let bestTarget = null;
      let secondTarget = null;
      let bestScore = -Infinity;
      let secondScore = -Infinity;
      let highestThreat = null;
      let highestThreatScore = -Infinity;

      for (let i = 0; i < enemies.length; i++) {
        const en = enemies[i];
        if (!en || en.dead) continue;

        const dx = this.shortestToroidalDx(me.x, en.x, W);
        const absDx = Math.abs(dx);
        const dy = en.y - me.y; // Positive = target is BELOW me (Kill Advantage)
        const dist = Math.hypot(dx, dy);

        // BIRD OF PREY: Primary metric is relentless pursuit of nearest prey
        let score = -dist * 2.2;

        if (dy >= 6.0) {
          score += 160.0;
          if (absDx < 28.0) score += 120.0; // Directly in dive crosshairs!
        } else if (dy < -4.0) {
          score -= 60.0;
          let threatScore = 0;
          if (absDx < CONFIG.lethalThreatRadiusX) threatScore += (CONFIG.lethalThreatRadiusX - absDx) * 3.0;
          if (Math.abs(dy) < CONFIG.lethalThreatRadiusY) threatScore += (CONFIG.lethalThreatRadiusY - Math.abs(dy));
          if (threatScore > highestThreatScore) {
            highestThreatScore = threatScore;
            highestThreat = en;
          }
        }

        if (score > bestScore) {
          secondScore = bestScore;
          secondTarget = bestTarget;
          bestScore = score;
          bestTarget = en;
        } else if (score > secondScore) {
          secondScore = score;
          secondTarget = en;
        }
      }

      this.lockedTarget = bestTarget || enemies[0];
      this.threatEnemy = highestThreat;
      this.swoopChainTarget = secondTarget;

      if (this.lockedTarget) {
        this.interceptPt = this.predictor.calculateInterceptPoint(me, this.lockedTarget, W, H);
      } else {
        this.interceptPt = null;
      }

      return { target: this.lockedTarget, threat: highestThreat, second: secondTarget };
    }

    predictKinematics(x, y, vx, vy, t, W, H) {
      const w = W - 16;
      let px = (x + vx * t) % w;
      if (px < 0) px += w;
      let pvy = Math.min(8.0, vy + 0.15 * t);
      let py = Math.max(46, Math.min(H - 30, y + vy * t + 0.075 * t * t));
      return { x: px, y: py, vx, vy: pvy };
    }

    extractState(out, lastAction) {
      out.fill(0);
      const me = this.getMe();
      if (!me) return false;

      const W = world.width || 1168;
      const H = world.height || 600;
      const maxSpd = (world.joustguys && world.joustguys.xSpeed) || 2.5;
      const w = W - 16;
      const platforms = (typeof world !== 'undefined' && world.platform) ? world.platform : [];
      const worldPlayers = (typeof world !== 'undefined' && world.players) ? world.players : [];

      // 1. Self Kinematics (0..15: 16 features)
      out[0] = (me.x / w) * 2 - 1;
      out[1] = (me.y / H) * 2 - 1;
      out[2] = (me.vx || 0) / maxSpd;
      out[3] = (me.vy || 0) / 8.0;
      out[4] = me.facingRight ? 1.0 : -1.0;
      out[5] = me.grounded ? 1.0 : -1.0;
      out[6] = Math.min(1.0, Math.abs(me.vx || 0) / maxSpd);
      out[7] = Math.min(1.0, ((me.vx || 0) ** 2 + (me.vy || 0) ** 2) / (maxSpd ** 2 + 64.0));
      out[8] = Math.min(1.0, me.y / 120.0);
      out[9] = Math.min(1.0, (H - me.y) / 120.0);
      out[10] = me.x / w;
      out[11] = (w - me.x) / w;
      out[12] = lastAction / 6.0;
      out[13] = Math.max(0, -(me.vy || 0)) / 8.0;
      out[14] = Math.max(0, (me.vy || 0)) / 8.0;
      out[15] = me.flapdown ? 1.0 : -1.0;

      // 2. Saliency-Ranked Top 4 Combat Targets (16..79: 64 features = 4 x 16)
      const evaluatedEnemies = [];
      let quadCount = [0, 0, 0, 0];
      let quadMinDist = [9999, 9999, 9999, 9999];
      let sumEnemyX = 0, sumEnemyY = 0, sumEnemyVx = 0, sumEnemyVy = 0;
      let activeEnemyCount = 0;
      let enemiesAbove = 0, enemiesBelow = 0;

      const myF6 = this.predictKinematics(me.x, me.y, me.vx || 0, me.vy || 0, 6, W, H);
      const myF12 = this.predictKinematics(me.x, me.y, me.vx || 0, me.vy || 0, 12, W, H);

      for (let i = 0; i < worldPlayers.length; i++) {
        const p = worldPlayers[i];
        if (!p || p.id === world.myId || p.team === me.team || p.dead) continue;

        activeEnemyCount++;
        sumEnemyX += p.x;
        sumEnemyY += p.y;
        sumEnemyVx += p.vx || 0;
        sumEnemyVy += p.vy || 0;

        const dx = this.shortestToroidalDx(me.x, p.x, W);
        const dy = p.y - me.y;
        const dist = Math.hypot(dx, dy);

        const relVx = (p.vx || 0) - (me.vx || 0);
        const relVy = (p.vy || 0) - (me.vy || 0);
        const closingSpeed = -(dx * relVx + dy * relVy) / (dist + 1e-4);

        if (dy < 0) enemiesAbove++;
        else enemiesBelow++;

        const qIdx = (dy < 0 ? 0 : 2) + (dx < 0 ? 0 : 1);
        quadCount[qIdx]++;
        if (dist < quadMinDist[qIdx]) quadMinDist[qIdx] = dist;

        const isThreat = (dy < -4);
        const isAdvantage = (dy > 4);
        let saliency = -dist;

        if (isThreat) {
          saliency = (W - dist) * 2.2 + Math.max(0, closingSpeed) * 150.0;
          if (Math.abs(dx) < 40) saliency += 300.0;
        } else if (isAdvantage) {
          saliency = (W - dist) * 2.8 + (dy * 12.0) + Math.max(0, closingSpeed) * 120.0;
          if (Math.abs(dx) < 32) saliency += 400.0;
        }

        evaluatedEnemies.push({ p, dx, dy, dist, relVx, relVy, closingSpeed, saliency });
      }

      evaluatedEnemies.sort((a, b) => b.saliency - a.saliency);

      if (evaluatedEnemies.length > 0) {
        this.lockedTarget = evaluatedEnemies[0].p;
        this.threatEnemy = enemiesAbove > 0 ? (evaluatedEnemies.find(e => e.dy < -4)?.p || null) : null;
      } else {
        this.lockedTarget = null;
        this.threatEnemy = null;
      }

      for (let k = 0; k < 4; k++) {
        const base = 16 + k * 16;
        if (k < evaluatedEnemies.length) {
          const en = evaluatedEnemies[k];
          const p = en.p;
          const oppF6 = this.predictKinematics(p.x, p.y, p.vx || 0, p.vy || 0, 6, W, H);
          const oppF12 = this.predictKinematics(p.x, p.y, p.vx || 0, p.vy || 0, 12, W, H);

          const dx6 = this.shortestToroidalDx(myF6.x, oppF6.x, W);
          const dy6 = oppF6.y - myF6.y;
          const dx12 = this.shortestToroidalDx(myF12.x, oppF12.x, W);
          const dy12 = oppF12.y - myF12.y;
          const tti = Math.min(1.0, en.dist / (Math.max(0.2, en.closingSpeed) * 400.0));

          out[base + 0] = en.dx / (W / 2);
          out[base + 1] = en.dy / H;
          out[base + 2] = en.relVx / 5.0;
          out[base + 3] = en.relVy / 16.0;
          out[base + 4] = Math.min(1.0, en.dist / 800.0);
          out[base + 5] = Math.max(-1.0, Math.min(1.0, en.dy / 25.0));
          out[base + 6] = Math.max(-1.0, Math.min(1.0, en.closingSpeed / 5.0));
          out[base + 7] = tti;
          out[base + 8] = dx6 / (W / 2);
          out[base + 9] = dy6 / H;
          out[base + 10] = dx12 / (W / 2);
          out[base + 11] = dy12 / H;
          out[base + 12] = (Math.abs(en.dx) < 32 && en.dy > 4) ? 1.0 : -1.0;
          out[base + 13] = (Math.abs(en.dx) < 40 && en.dy < -4) ? 1.0 : -1.0;
          out[base + 14] = (p.facingRight === (en.dx > 0)) ? -1.0 : 1.0;
          out[base + 15] = 1.0;
        } else {
          out[base + 0] = 0; out[base + 1] = 0; out[base + 2] = 0; out[base + 3] = 0;
          out[base + 4] = 1.0; out[base + 5] = 0; out[base + 6] = 0; out[base + 7] = 1.0;
          out[base + 8] = 0; out[base + 9] = 0; out[base + 10] = 0; out[base + 11] = 0;
          out[base + 12] = -1.0; out[base + 13] = -1.0; out[base + 14] = 0; out[base + 15] = -1.0;
        }
      }

      // 3. Global Swarm Density & Combat Heatmap (80..95: 16 features)
      out[80] = quadCount[0] / 6.0;
      out[81] = Math.min(1.0, quadMinDist[0] / 600.0);
      out[82] = quadCount[1] / 6.0;
      out[83] = Math.min(1.0, quadMinDist[1] / 600.0);
      out[84] = quadCount[2] / 6.0;
      out[85] = Math.min(1.0, quadMinDist[2] / 600.0);
      out[86] = quadCount[3] / 6.0;
      out[87] = Math.min(1.0, quadMinDist[3] / 600.0);

      if (activeEnemyCount > 0) {
        const avgX = sumEnemyX / activeEnemyCount;
        const avgY = sumEnemyY / activeEnemyCount;
        out[88] = this.shortestToroidalDx(me.x, avgX, W) / (W / 2);
        out[89] = (avgY - me.y) / H;
        out[90] = (sumEnemyVx / activeEnemyCount) / maxSpd;
        out[91] = (sumEnemyVy / activeEnemyCount) / 8.0;
        out[92] = enemiesAbove / activeEnemyCount;
        out[93] = enemiesBelow / activeEnemyCount;
      }
      out[94] = (quadCount[0] + quadCount[2] > 0 && quadCount[1] + quadCount[3] > 0) ? 1.0 : -1.0;
      out[95] = activeEnemyCount / 17.0;

      // 4. 8-Direction Platform Hitbox Raycasts (96..127: 32 features)
      const angles = [0, Math.PI / 4, Math.PI / 2, 3 * Math.PI / 4, Math.PI, 5 * Math.PI / 4, 3 * Math.PI / 2, 7 * Math.PI / 4];
      for (let a = 0; a < 8; a++) {
        const base = 96 + a * 4;
        const ang = angles[a];
        const cosA = Math.cos(ang);
        const sinA = Math.sin(ang);

        let rayDist = 250.0;
        let surfaceType = 0.0;

        for (let r = 10; r <= 250; r += 15) {
          let rx = me.x + cosA * r;
          let ry = me.y + sinA * r;
          if (rx < 0) rx += w;
          if (rx >= w) rx -= w;

          if (ry <= 46) {
            rayDist = r;
            surfaceType = -1.0;
            break;
          }
          if (ry >= H - 30) {
            rayDist = r;
            surfaceType = 1.0;
            break;
          }

          let hit = false;
          for (let pIdx = 0; pIdx < platforms.length; pIdx++) {
            const p = platforms[pIdx];
            const px1 = p.x1 !== undefined ? p.x1 : p.x;
            const px2 = p.x2 !== undefined ? p.x2 : p.x + 80;
            const py1 = p.y1 !== undefined ? p.y1 : p.y;
            const py2 = p.y2 !== undefined ? p.y2 : p.y + 12;

            if (rx >= px1 && rx <= px2 && ry >= py1 && ry <= py2) {
              rayDist = r;
              surfaceType = (sinA > 0) ? 1.0 : -1.0;
              hit = true;
              break;
            }
          }
          if (hit) break;
        }

        const vProj = ((me.vx || 0) * cosA + (me.vy || 0) * sinA) / maxSpd;
        out[base + 0] = rayDist / 250.0;
        out[base + 1] = surfaceType;
        out[base + 2] = Math.max(-1.0, Math.min(1.0, vProj));
        out[base + 3] = (rayDist < 40 && surfaceType === -1.0) ? 1.0 : -1.0;
      }

      return true;
    }
  }

  // ==========================================================================
  // IRONCLAD ZERO-DEATH ACTION EXECUTOR & EVASION SHIELD
  // ==========================================================================
  class GracefulActionExecutor {
    constructor() {
      this.heldKeys = {};
      this.flapTimeout = null;
      this.lastFlapTime = 0;
      this.currentHoldDir = 0;
      this.holdDirStartTime = 0;
      this.smoothedQ = new Float32Array(CONFIG.actionDim);
    }

    sendKey(keyCode, isDown) {
      const sock = window.socket || (typeof socket !== 'undefined' ? socket : null);
      const me = typeof world !== 'undefined' ? world.dude : null;
      if (!me) return;

      try {
        if (isDown) {
          if (!this.heldKeys[keyCode]) {
            this.heldKeys[keyCode] = true;
            if (sock) sock.emit('keydown', keyCode);
            if (me.handleKeyDown) me.handleKeyDown(keyCode);
          }
        } else {
          if (this.heldKeys[keyCode]) {
            this.heldKeys[keyCode] = false;
            if (sock) sock.emit('keyup', keyCode);
            if (me.handleKeyUp) me.handleKeyUp(keyCode);
          }
        }
      } catch (e) {}
    }

    triggerFlap(now, minInterval = CONFIG.minFlapIntervalMs, pulseDuration = CONFIG.flapPulseDurationMs) {
      if (now - this.lastFlapTime < minInterval) return false;
      this.lastFlapTime = now;
      this.sendKey(38, true);
      if (this.flapTimeout) clearTimeout(this.flapTimeout);
      this.flapTimeout = setTimeout(() => {
        this.sendKey(38, false);
      }, pulseDuration);
      return true;
    }

            computeGrandmasterTacticalAction(me, env, W, H, platforms) {
      if (!me || me.dead) return ACTIONS.IDLE;

      const enemies = env ? env.getEnemies() : [];
      const target = env ? env.lockedTarget : null;
      const threat = env ? env.threatEnemy : null;
      if (this.ctrl && this.ctrl.tacticalCore) {
        return this.ctrl.tacticalCore.computeTacticalAction(me, target, threat, enemies, W, H, platforms);
      }

      // 1. REFLEXIVE EMERGENCY DEFENSE: evade overhead threat
      if (threat && !threat.dead) {
        const tDx = env.shortestToroidalDx(me.x, threat.x, W);
        const tDy = threat.y - me.y;
        if (tDy < 5 && Math.abs(tDx) < CONFIG.lethalThreatRadiusX) {
          // Threat is above us: full lateral evasion thrust away from threat vector
          return tDx >= 0 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
        }
      }

      // 2. OBSTACLE HORIZONTAL BYPASS: if underneath platform, escape laterally before climbing
      const overhead = env ? env.predictor.getOverheadPlatformObstacle(me, platforms, W) : { blocked: false };
      if (overhead.blocked && overhead.gap < 55) {
        return overhead.escapeDir === -1 ? ACTIONS.LEFT : ACTIONS.RIGHT;
      }

      // 3. GROUNDED TAKE-OFF LAUNCH: never walk on platforms
      if (me.grounded) {
        return me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
      }

      // 4. LETHAL FALCON DIVE (GUILLOTINE STRIKE): confirmed altitude advantage + aligned
      if (target && !target.dead) {
        const dx = env.shortestToroidalDx(me.x, target.x, W);
        const dy = target.y - me.y; // Positive = target is BELOW me

        if (dy >= 18 && Math.abs(dx) < 32) {
          // Perfect strike alignment: pure gravity dive, steer horizontally towards target
          if (dx < -3) return ACTIONS.LEFT;
          if (dx > 3) return ACTIONS.RIGHT;
          return ACTIONS.IDLE; // Direct vertical drop
        }

        // 5. HIGH GROUND ACQUISITION & APEX HEGEMONY:
        // If we do not have confirmed height advantage over target, climb first!
        if (dy < 24 || me.y > CONFIG.apexCruisingMaxY) {
          // Target intercept horizontal direction
          const targetDir = dx > 0 ? ACTIONS.RIGHT_FLAP : ACTIONS.LEFT_FLAP;

          // Maintain smooth upward climb cadence
          if (me.y > 60 && me.vy > -1.2) {
            return targetDir;
          }
          return dx > 0 ? ACTIONS.RIGHT : ACTIONS.LEFT;
        }

        // 6. APEX CRUISE & TOROIDAL AMBUSH:
        // We have high ground (y in [45, 80]), closing in horizontally from above
        const ambushDx = env.shortestToroidalDx(me.x, target.x + (target.vx || 0) * 8, W);
        const flapCadence = (me.y > 65 && me.vy > 0.3);

        if (ambushDx < -15) {
          return flapCadence ? ACTIONS.LEFT_FLAP : ACTIONS.LEFT;
        } else if (ambushDx > 15) {
          return flapCadence ? ACTIONS.RIGHT_FLAP : ACTIONS.RIGHT;
        } else {
          return flapCadence ? ACTIONS.FLAP : ACTIONS.IDLE;
        }
      }

      // 7. DEFAULT APEX SOARING PATROL
      if (me.y > 80) return me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
      if (me.y > 60 && me.vy > 0.35) return ACTIONS.FLAP;
      return ACTIONS.IDLE;
    }

    filterAction(rawQValues, lastAction, me, isEmergency = false, inLethalDive = false, env = null) {
      let bestAction = 0;
      let maxQ = -Infinity;

      for (let a = 0; a < rawQValues.length; a++) {
        this.smoothedQ[a] = 0.85 * rawQValues[a] + 0.15 * this.smoothedQ[a];
        let effectiveQ = this.smoothedQ[a];

        // Emergency ground recovery
        if (me && me.grounded && !isEmergency) {
          if (a === ACTIONS.LEFT_FLAP || a === ACTIONS.RIGHT_FLAP || a === ACTIONS.FLAP) {
            effectiveQ += 2.0;
          }
        }

        if (effectiveQ > maxQ) {
          maxQ = effectiveQ;
          bestAction = a;
        }
      }

      return bestAction;
    }

    execute(action, me, isEmergency = false, inLethalDive = false) {
      if (!me || me.dead) {
        this.releaseAll();
        return;
      }

      const now = Date.now();
      const H = (typeof world !== 'undefined' && world.height) || 600;

      let wantsFlap = (action === ACTIONS.FLAP || action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP);

      // Simple boundary guard
      if (me.y < CONFIG.ceilingSafeY && !isEmergency) {
        wantsFlap = false;
      }
      if (me.y > H - CONFIG.floorSafeY && me.vy > -0.5) {
        wantsFlap = true;
      }

      let targetDir = 0;
      if (action === ACTIONS.LEFT || action === ACTIONS.LEFT_FLAP) targetDir = -1;
      else if (action === ACTIONS.RIGHT || action === ACTIONS.RIGHT_FLAP) targetDir = 1;

      if (targetDir === -1) {
        this.sendKey(39, false);
        this.sendKey(37, true);
      } else if (targetDir === 1) {
        this.sendKey(37, false);
        this.sendKey(39, true);
      } else {
        this.sendKey(37, false);
        this.sendKey(39, false);
      }

      if (action === ACTIONS.STOP) {
        this.sendKey(37, false);
        this.sendKey(39, false);
        this.sendKey(40, true);
        setTimeout(() => this.sendKey(40, false), 35);
      }

      if (wantsFlap) {
        this.triggerFlap(now, CONFIG.minFlapIntervalMs, CONFIG.flapPulseDurationMs);
      }
    }

    releaseAll() {
      if (this.flapTimeout) clearTimeout(this.flapTimeout);
      [37, 38, 39, 40].forEach((k) => this.sendKey(k, false));
      this.heldKeys = {};
      this.currentHoldDir = 0;
      this.holdDirStartTime = 0;
    }
  }

    // ==========================================================================
  // MORTAL KOMBAT STYLE COMBO BANNER & PARTICLE FX ENGINE
  // ==========================================================================
  class MortalKombatComboFX {
    constructor() {
      this.particles = [];
      this.floatingTexts = [];
      this.audioCtx = null;
      this.initDOM();
    }

    initDOM() {
      const old = document.getElementById("mk-combo-container");
      if (old) old.remove();

      this.domContainer = document.createElement("div");
      this.domContainer.id = "mk-combo-container";
      this.domContainer.innerHTML = `
        <style>
          #mk-combo-container {
            position: fixed;
            top: 24%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 999998;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: "Impact", "Arial Black", "Trebuchet MS", sans-serif;
            text-align: center;
          }
          .mk-banner {
            animation: mk-punch-in 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 8px;
            position: relative;
            filter: drop-shadow(0 0 25px rgba(255, 0, 50, 0.95));
          }
          .mk-title {
            font-size: 48px;
            font-weight: 900;
            background: linear-gradient(180deg, #ffffff 0%, #ffeb3b 30%, #ff3d00 70%, #b71c1c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke: 2px #000;
            text-shadow: 0 0 30px rgba(255, 60, 0, 0.9), 0 0 60px rgba(255, 0, 0, 0.8);
            line-height: 1.1;
          }
          .mk-subtitle {
            font-size: 22px;
            font-weight: 800;
            color: #00ffcc;
            text-shadow: 0 0 14px #00ffcc, 0 0 28px rgba(0, 255, 204, 0.85), 2px 2px 0 #000;
            letter-spacing: 5px;
            margin-top: 2px;
          }
          .mk-sub-streak {
            font-size: 14px;
            font-weight: bold;
            color: #fff;
            background: rgba(183, 28, 28, 0.9);
            border: 1px solid #ffeb3b;
            padding: 3px 16px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 5px;
            box-shadow: 0 0 20px rgba(255, 235, 59, 0.85);
            letter-spacing: 2px;
          }
          @keyframes mk-punch-in {
            0% {
              transform: scale(0.1) rotate(-14deg);
              opacity: 0;
            }
            22% {
              transform: scale(1.45) rotate(4deg);
              opacity: 1;
            }
            45% {
              transform: scale(0.92) rotate(-2deg);
              opacity: 1;
            }
            75% {
              transform: scale(1.05) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: scale(1.0) translateY(-40px);
              opacity: 0;
            }
          }
        </style>
      `;
      document.body.appendChild(this.domContainer);
    }

    triggerCombo(comboCount, killsGained, x, y) {
      // Only show Mortal Kombat feedback when combos are 2 or more
      if (!comboCount || comboCount < 2) return;

      let title = "BRUTALITY!";
      let sub = "🔥 2-HIT COMBO 🔥";
      let pts = 650;

      if (comboCount === 2) {
        title = "BRUTALITY!";
        sub = "🔥 2-HIT COMBO 🔥";
        pts = 650;
      } else if (comboCount === 3) {
        title = "TOASTY!";
        sub = "⚡ SUPERB! 3-HIT COMBO ⚡";
        pts = 1300;
      } else if (comboCount === 4) {
        title = "FATALITY!";
        sub = "💀 OUTSTANDING! 4-HIT COMBO 💀";
        pts = 2200;
      } else if (comboCount >= 5) {
        title = "FLAWLESS VICTORY!";
        sub = `🩸 GODLIKE! ${comboCount}-HIT COMBO 🩸`;
        pts = 3500 + (comboCount - 5) * 1000;
      }

      const banner = document.createElement("div");
      banner.className = "mk-banner";
      banner.innerHTML = `
        <div class="mk-title">${title}</div>
        <div class="mk-subtitle">${sub}</div>
        <div class="mk-sub-streak">+${pts} COMBO POINTS</div>
      `;
      this.domContainer.appendChild(banner);

      setTimeout(() => banner.remove(), 1500);

      this.playArcadeSting(comboCount);
    }

    playArcadeSting(comboCount) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.audioCtx) this.audioCtx = new AudioCtx();
        if (this.audioCtx.state === "suspended") this.audioCtx.resume();

        const ctx = this.audioCtx;
        const now = ctx.currentTime;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        const baseFreq = 160 + comboCount * 60;
        osc1.type = "sawtooth";
        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.16);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
        osc2.frequency.exponentialRampToValueAtTime(baseFreq * 3.0, now + 0.18);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.35);
        osc2.stop(now + 0.35);
      } catch (e) {}
    }
  }

  // ==========================================================================
  // ZERO-DEATH REWARD SHAPING & SURVIVAL ENGINE
  // ==========================================================================
  class RewardEngine {
    constructor() {
      this.lastFrags = 0;
      this.lastDeaths = 0;
      this.wasDead = false;
      this.hadTerrainBump = false;
      this.lastFragTime = 0;
      this.currentCombo = 0;
      this.lastTargetDist = null;
      this.lastPredictedGap = null;
      this.comboFX = new MortalKombatComboFX();
    }

    computeReward(me, state, action, enemies, worldHeight) {
      if (!me) return 0;

      let reward = 0.0;
      const now = Date.now();

      // 1. Frag & Swift Multi-Combo Chain-Kill Reward
      const currentFrags = me.fragcount || me.score || 0;
      if (currentFrags > this.lastFrags) {
        const killsGained = currentFrags - this.lastFrags;
        const elapsedSinceLast = now - this.lastFragTime;

        if (elapsedSinceLast < CONFIG.comboWindowMs) {
          this.currentCombo += killsGained;
        } else {
          this.currentCombo = killsGained;
        }
        this.lastFragTime = now;

        // Exponential Swift Combo Multipliers:
        // 1 kill: 250, 2 kills: 650, 3 kills: 1300, 4 kills: 2200, 5+ kills: 3500+
        let comboMultiplier = 1.0;
        if (this.currentCombo === 1) comboMultiplier = 1.0;
        else if (this.currentCombo === 2) comboMultiplier = 2.6;
        else if (this.currentCombo === 3) comboMultiplier = 5.2;
        else if (this.currentCombo === 4) comboMultiplier = 8.8;
        else comboMultiplier = 14.0;

        // Swiftness Bonus: extra reward for eliminating in < 2.0s
        let swiftBonus = 0;
        if (elapsedSinceLast < 2000 && this.currentCombo > 1) {
          swiftBonus = 200.0;
        }

        const killReward = (250.0 * killsGained * comboMultiplier) + swiftBonus;
        reward += killReward;
        this.lastFrags = currentFrags;

        // Trigger Mortal Kombat style animation & sound sting
        this.comboFX.triggerCombo(this.currentCombo, killsGained, me.x, me.y);
      }

      // 2. CATASTROPHIC DEATH PENALTY (-500.0)
      if (me.dead && !this.wasDead) {
        reward -= 500.0;
        this.wasDead = true;
        this.currentCombo = 0;
      } else if (!me.dead && this.wasDead) {
        this.wasDead = false;
      }

      // 3. Graceful Flying, Continuous Parabolic Arcs & Minimal Keypress Economy
      if (!me.grounded && !me.dead) {
        this.airborneGlideStreak = (this.airborneGlideStreak || 0) + 1;
        const soarBonus = Math.min(2.5, this.airborneGlideStreak * 0.015);
        reward += 0.15 + soarBonus;

        const speed = Math.abs(me.vx || 0);
        // Kinetic momentum in graceful flight
        if (speed >= 1.4 && !this.hadTerrainBump) {
          reward += 0.45 * (speed / 2.5);

          // Minimal Keypress Conservation: Heavily reward IDLE when carrying smooth high-speed arcs!
          if (action === ACTIONS.IDLE) {
            reward += 0.85; // Effortless momentum gliding!
          } else if (action === ACTIONS.LEFT || action === ACTIONS.RIGHT) {
            reward += 0.40; // Smooth aerodynamic direction curving
          }
        }

        // Flap Economy: penalize spastic redundant flaps when already climbing fast
        if (action === ACTIONS.FLAP || action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP) {
          if ((me.vy || 0) < -2.8) {
            reward -= 0.65; // Over-flapping penalty! Let momentum carry the arc!
          }
        }

        // Action Churn Penalty (discourage jittery left/right shaking)
        if ((action === ACTIONS.LEFT && this.lastAction === ACTIONS.RIGHT) ||
            (action === ACTIONS.RIGHT && this.lastAction === ACTIONS.LEFT)) {
          reward -= 0.35;
        }
      } else {
        this.airborneGlideStreak = 0;
      }
      this.lastAction = action;

      // 4. Terrain Bonk Penalties
      if (this.hadTerrainBump) {
        reward -= 30.0;
        this.hadTerrainBump = false;
      }

      if (me.y < 15) reward -= 10.0;
      if (me.y > worldHeight - 35) reward -= 10.0;

      // 5. Combat Altitude Hegemony & Bloodlust Predator Reward
      const topTargetAdvantage = state ? state[21] : 0; // +1 kill advantage, -1 threat
      const isAbove = topTargetAdvantage > 0;
      const closingSpeed = state ? state[22] : 0;
      const dist = state ? state[20] : 1.0;
      const inLethalDiveCone = state ? (state[28] > 0) : false;
      const inThreatDangerCone = state ? (state[29] > 0) : false;

      if (enemies.length > 0) {
        if (topTargetAdvantage > 0.2) {
          reward += 1.5;
          if (inLethalDiveCone) {
            reward += 4.5;
            if (me.vy > 1.2) reward += 3.0; // Predatory dive velocity
          }
        } else if (inThreatDangerCone) {
          reward -= 6.0;
          if (action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP || action === ACTIONS.FLAP) {
            reward += 4.0; // Reflexive evasive reaction
          }
        }

        // 6. Optimal Elimination Path Following & Vector Alignment Reward
        if (this.ctrl && this.ctrl.env && this.ctrl.env.optimalTourWaypoints && this.ctrl.env.optimalTourWaypoints.length > 1) {
          const wp = this.ctrl.env.optimalTourWaypoints[1];
          if (wp) {
            const W = (typeof world !== "undefined" && world.width) || 1168;
            const dxToWp = this.ctrl.env.shortestToroidalDx(me.x, wp.x, W);
            const dyToWp = wp.y - me.y;
            const distToWp = Math.hypot(dxToWp, dyToWp);

            if (distToWp > 4) {
              const ux = dxToWp / distToWp;
              const uy = dyToWp / distToWp;
              const vAlongPath = ((me.vx || 0) * ux) + ((me.vy || 0) * uy);

              if (vAlongPath > 0) {
                reward += vAlongPath * 2.2;
              } else {
                reward -= 0.3;
              }

              if (distToWp < 75) {
                reward += (75 - distToWp) * 0.05;
              }
            }
          }
        }

        // 7. RELENTLESS ENEMY PROXIMITY & DISTANCE CLOSING REWARD
        const W = (typeof world !== "undefined" && world.width) || 1168;
        const target = (this.ctrl && this.ctrl.env) ? this.ctrl.env.lockedTarget : (enemies[0] || null);
        if (target && !target.dead) {
          const dx = this.ctrl && this.ctrl.env ? this.ctrl.env.shortestToroidalDx(me.x, target.x, W) : (target.x - me.x);
          const dy = target.y - me.y;
          const currentDist = Math.hypot(dx, dy);

          // Kinetic Delta Closing Reward: reward every pixel closed toward the enemy!
          if (this.lastTargetDist !== undefined && this.lastTargetDist !== null) {
            const distDelta = this.lastTargetDist - currentDist; // Positive when closing distance
            if (distDelta > 0.05) {
              reward += distDelta * 2.8; // High reward for closing in!
            } else if (distDelta < -0.1 && !inThreatDangerCone) {
              reward += distDelta * 0.8;
            }
          }
          this.lastTargetDist = currentDist;

          // Continuous Inverse-Distance Proximity Field
          const proximityBonus = 35.0 / (1.0 + (currentDist / 40.0));
          if (isAbove) {
            reward += proximityBonus * 0.45;
          } else {
            reward += proximityBonus * 0.20;
          }

          // Direct approach velocity vector reward
          const unitDx = dx / (currentDist + 1e-5);
          const unitDy = dy / (currentDist + 1e-5);
          const closingVelocity = ((me.vx || 0) * unitDx) + ((me.vy || 0) * unitDy);
          if (closingVelocity > 0) {
            reward += closingVelocity * 2.5;
          }
        } else {
          this.lastTargetDist = null;
        }

        // 8. "RIGHT PLACE AT THE RIGHT TIME" - SPATIOTEMPORAL INTERCEPT REWARD
        if (this.ctrl && this.ctrl.env && this.ctrl.env.predictor && target && !target.dead) {
          const spatiotemporal = this.ctrl.env.predictor.findBestFutureInterceptSpatiotemporal(
            me,
            target,
            W,
            worldHeight,
            world.platform || [],
            20
          );

          if (spatiotemporal) {
            if (spatiotemporal.isRightPlaceRightTime) {
              const timeUrgency = Math.max(1, 20 - spatiotemporal.ticks);
              reward += 6.5 * (timeUrgency / 20.0);

              if (spatiotemporal.ticks <= 8) {
                reward += 12.0; // Imminent guaranteed strike! Right place, right time!
              }
            }

            if (this.lastPredictedGap !== undefined && this.lastPredictedGap !== null) {
              const gapDelta = this.lastPredictedGap - spatiotemporal.minGap;
              if (gapDelta > 0.05 && spatiotemporal.hasAdvantage) {
                reward += gapDelta * 3.2; // Massive reward for trajectory convergence!
              }
            }
            this.lastPredictedGap = spatiotemporal.minGap;
          }
        }

        // Relentless swift hunting reward for nearest enemy
        if (dist < 0.55) {
          if (isAbove) {
            reward += 3.5;
            if (inLethalDiveCone) {
              reward += 7.0; // High incentive to execute lethal dive on target!
              if (action === ACTIONS.IDLE || action === ACTIONS.LEFT || action === ACTIONS.RIGHT) {
                reward += 3.0;
              }
            }
            if (closingSpeed > 0) reward += 3.0 * closingSpeed;
          } else {
            reward -= 5.0;
            if (action === ACTIONS.FLAP || action === ACTIONS.LEFT_FLAP || action === ACTIONS.RIGHT_FLAP) reward += 2.0;
            if (closingSpeed < 0) reward += 1.5;
          }
        }
      }

      if (me.grounded && Math.abs(me.vx) < 0.1) reward -= 0.5;

      return reward;
    }
  }

  // ==========================================================================
  // LIVE DOM HUD & ZERO-DEATH SHIELD OVERLAYS
  // ==========================================================================
  class VisualHUD {
    constructor(controller) {
      this.ctrl = controller;
      this.container = null;
      this.canvas = null;
      this.ctx = null;
      this.qBars = [];
      this.metricsEls = {};
      this.showVectors = true;
      this.isMinimized = true;
      this.animFrameId = null;
      this.initHUD();
      this.startAnimLoop();
    }

    initHUD() {
      const old = document.getElementById('joust-q-hud');
      if (old) old.remove();

      this.container = document.createElement('div');
      this.container.id = 'joust-q-hud';
      this.container.innerHTML = `
        <style>
          #joust-q-hud {
            position: fixed;
            bottom: 12px;
            right: 12px;
            width: 340px;
            background: rgba(8, 14, 26, 0.94);
            border: 2px solid #00ffcc;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 255, 204, 0.45);
            font-family: "Courier New", monospace;
            font-size: 11px;
            color: #e0f7fa;
            z-index: 999999;
            user-select: none;
            padding: 10px;
            backdrop-filter: blur(6px);
            transition: width 0.2s ease;
          }
          #joust-q-hud .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #00ffcc;
            padding-bottom: 5px;
            margin-bottom: 8px;
            font-weight: bold;
            font-size: 12px;
            color: #00ffcc;
            letter-spacing: 1px;
          }
          #joust-q-hud .stat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px 10px;
            margin-bottom: 8px;
          }
          #joust-q-hud .stat-row {
            display: flex;
            justify-content: space-between;
          }
          #joust-q-hud .stat-val {
            font-weight: bold;
            color: #fff;
          }
          #joust-q-hud .badge {
            display: inline-block;
            padding: 2px 7px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
          }
          #joust-q-hud .badge-adv { background: #00c853; color: #000; }
          #joust-q-hud .badge-dive { background: #ffeb3b; color: #000; font-weight: 900; }
          #joust-q-hud .badge-danger { background: #d50000; color: #fff; }
          #joust-q-hud .badge-neutral { background: #555; color: #fff; }
          #joust-q-hud .badge-combo { background: #ff007f; color: #fff; font-weight: bold; }
          #joust-q-hud .badge-shield { background: #00e5ff; color: #000; font-weight: bold; }
          #joust-q-hud .q-section {
            margin-top: 6px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            padding: 6px;
          }
          #joust-q-hud .q-title {
            font-size: 10px;
            color: #80deea;
            margin-bottom: 4px;
            text-transform: uppercase;
          }
          #joust-q-hud .q-bar-row {
            display: flex;
            align-items: center;
            margin-bottom: 3px;
            font-size: 10px;
          }
          #joust-q-hud .q-label {
            width: 52px;
          }
          #joust-q-hud .q-bar-bg {
            flex: 1;
            height: 8px;
            background: #222;
            border-radius: 2px;
            overflow: hidden;
            margin: 0 6px;
          }
          #joust-q-hud .q-bar-fill {
            height: 100%;
            width: 0%;
            background: #00ffcc;
            transition: width 0.04s ease;
          }
          #joust-q-hud .q-bar-fill.active {
            background: #ffeb3b;
          }
          #joust-q-hud .q-val-text {
            width: 44px;
            text-align: right;
          }
          #joust-q-hud .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 8px;
          }
          #joust-q-hud button {
            flex: 1 1 45%;
            background: #004d40;
            border: 1px solid #00ffcc;
            color: #00ffcc;
            padding: 4px 6px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 10px;
            font-family: inherit;
            transition: all 0.15s ease;
          }
          #joust-q-hud button:hover {
            background: #00796b;
          }
          #joust-q-hud button.active-toggle {
            background: #00ffcc;
            color: #000;
            font-weight: bold;
          }
          #joust-q-hud .btn-icon {
            flex: none;
            padding: 2px 7px;
            font-size: 11px;
            font-weight: bold;
          }
        </style>
        <div class="header">
          <div style="display:flex; align-items:center; gap:6px;">
            <span>🧠 APEX CHIMERA AI</span>
            <span id="hud-status" class="badge badge-neutral">4 SPECIALTIES</span>
          </div>
          <button id="hud-btn-min" class="btn-icon" title="Minimize / Expand Overlay">−</button>
        </div>
        <div id="hud-body">
          <div class="stat-grid">
            <div class="stat-row"><span>Architecture:</span><span id="hud-arch" class="stat-val" style="color:#00ffcc">Omni-Specialty ENN</span></div>
            <div class="stat-row"><span>Episode Reward:</span><span id="hud-rew" class="stat-val">+0.0</span></div>
            <div class="stat-row"><span>🦅 Falcon (Speed):</span><span id="hud-speed" class="stat-val">0%</span></div>
            <div class="stat-row"><span>🐍 Viper (Wrap):</span><span id="hud-wrap" class="stat-val">READY</span></div>
            <div class="stat-row"><span>⚡ Striker (Combo):</span><span id="hud-combo" class="stat-val">IRONCLAD</span></div>
            <div class="stat-row"><span>👑 Sovereign (K/D):</span><span id="hud-kd" class="stat-val">0 / 0 (0.00)</span></div>
            <div class="stat-row"><span>Epsilon (ε):</span><span id="hud-eps" class="stat-val">0.01</span></div>
            <div class="stat-row"><span>Inference:</span><span class="stat-val" style="color:#00ffcc">100% Neural Net</span></div>
          </div>
          <div class="q-section">
            <div class="q-title">Neural Network Output Q-Values (7 Actions)</div>
            <div id="hud-q-bars"></div>
          </div>
          <div class="controls">
            <button id="hud-btn-vectors" class="active-toggle" title="Toggle Vector Graphics Overlay">🎨 Vectors: ON</button>
            <button id="hud-btn-learn" class="active-toggle">Learning: ON</button>
            <button id="hud-btn-explore" class="active-toggle">Exploration: ON</button>
            <button id="hud-btn-save">💾 Save Model</button>
            <button id="hud-btn-export">⬇️ Export JSON</button>
            <button id="hud-btn-reset" style="border-color: #ff5252; color: #ff5252;">⚠️ Reset Weights</button>
          </div>
        </div>
      `;

      document.body.appendChild(this.container);

      const qContainer = this.container.querySelector("#hud-q-bars");
      this.qBars = [];
      ACTION_NAMES.forEach((name, i) => {
        const row = document.createElement("div");
        row.className = "q-bar-row";
        row.innerHTML = `
          <div class="q-label">${name}</div>
          <div class="q-bar-bg"><div class="q-bar-fill" id="q-fill-${i}"></div></div>
          <div class="q-val-text" id="q-val-${i}">0.00</div>
        `;
        qContainer.appendChild(row);
        this.qBars.push({
          fill: row.querySelector(`#q-fill-${i}`),
          text: row.querySelector(`#q-val-${i}`),
        });
      });

      this.bodyEl = this.container.querySelector("#hud-body");
      this.btnMin = this.container.querySelector("#hud-btn-min");
      this.btnVectors = this.container.querySelector("#hud-btn-vectors");

      this.metricsEls = {
        status: this.container.querySelector("#hud-status"),
        arch: this.container.querySelector("#hud-arch"),
        kd: this.container.querySelector("#hud-kd"),
        rew: this.container.querySelector("#hud-rew"),
        speed: this.container.querySelector("#hud-speed"),
        wrap: this.container.querySelector("#hud-wrap"),
        eps: this.container.querySelector("#hud-eps"),
        replay: this.container.querySelector("#hud-replay"),
        combo: this.container.querySelector("#hud-combo"),
      };

      // Vector Graphics Toggle
      this.btnVectors.onclick = () => {
        this.showVectors = !this.showVectors;
        this.btnVectors.textContent = `🎨 Vectors: ${this.showVectors ? "ON" : "OFF"}`;
        this.btnVectors.classList.toggle("active-toggle", this.showVectors);
        if (!this.showVectors && this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
      };

      // Minimize / Expand Toggle
      this.isMinimized = true; // Start minimized by default
      this.btnMin.onclick = () => {
        this.isMinimized = !this.isMinimized;
        this.bodyEl.style.display = this.isMinimized ? "none" : "block";
        this.btnMin.textContent = this.isMinimized ? "+" : "−";
        this.container.style.width = this.isMinimized ? "210px" : "340px";
      };

      this.bodyEl.style.display = "none";
      this.btnMin.textContent = "+";
      this.container.style.width = "210px";

      const btnLearn = this.container.querySelector("#hud-btn-learn");
      btnLearn.onclick = () => {
        this.ctrl.isLearning = !this.ctrl.isLearning;
        btnLearn.textContent = `Learning: ${this.ctrl.isLearning ? "ON" : "OFF"}`;
        btnLearn.classList.toggle("active-toggle", this.ctrl.isLearning);
      };

      const btnExplore = this.container.querySelector("#hud-btn-explore");
      btnExplore.onclick = () => {
        this.ctrl.isExploring = !this.ctrl.isExploring;
        btnExplore.textContent = `Exploration: ${this.ctrl.isExploring ? "ON" : "OFF"}`;
        btnExplore.classList.toggle("active-toggle", this.ctrl.isExploring);
      };

      this.container.querySelector("#hud-btn-save").onclick = () => this.ctrl.saveModel();
      this.container.querySelector("#hud-btn-export").onclick = () => this.ctrl.exportModelJSON();
      this.container.querySelector("#hud-btn-reset").onclick = () => {
        if (confirm("Reset Q-Learning neural network weights to random?")) this.ctrl.resetBrain();
      };

      this.setupOverlayCanvas();
    }

    setupOverlayCanvas() {
      const arena = document.getElementById('arena') || document.body;
      const oldCanvas = document.getElementById('joust-q-canvas');
      if (oldCanvas) oldCanvas.remove();

      this.canvas = document.createElement('canvas');
      this.canvas.id = 'joust-q-canvas';
      this.canvas.style.position = 'absolute';
      this.canvas.style.left = '0px';
      this.canvas.style.top = '0px';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '100';
      arena.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
    }

    startAnimLoop() {
      const render = () => {
        const me = this.ctrl && this.ctrl.env ? this.ctrl.env.getMe() : null;
        const state = this.ctrl ? this.ctrl.currentState : null;
        if (this.showVectors) {
          this.drawCanvasOverlay(me, state);
        }
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
          this.animFrameId = window.requestAnimationFrame(render);
        }
      };
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        this.animFrameId = window.requestAnimationFrame(render);
      }
    }

    update(qValues, selectedAction, isExploratory, state, reward, loss) {
      if (!this.container) return;

      const me = this.ctrl.env.getMe();
      const kills = this.ctrl.totalKills;
      const deaths = this.ctrl.totalDeaths;
      const kd = deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2);
      const isEmergency = state && state[16] > 0;
      const inLethalDive = state && state[22] > 0;
      const isAdvantage = state && state[5] > 0;
      const speedRatio = state ? Math.round((state[24] || 0) * 100) : 0;
      const combo = (this.ctrl.rewardEngine && this.ctrl.rewardEngine.currentCombo) || 0;

      if (this.metricsEls.kd) this.metricsEls.kd.textContent = `${kills} / ${deaths} (${kd})`;
      if (this.metricsEls.rew) this.metricsEls.rew.textContent = `${reward >= 0 ? '+' : ''}${this.ctrl.episodeReward.toFixed(1)}`;
      if (this.metricsEls.speed) this.metricsEls.speed.textContent = `${speedRatio}%`;
      const isWrapFlank = state && state[25] > 0;
      if (this.metricsEls.wrap) this.metricsEls.wrap.textContent = isWrapFlank ? '⚡ FLANKING' : 'READY';
      if (this.metricsEls.eps) this.metricsEls.eps.textContent = this.ctrl.epsilon.toFixed(3);
      if (this.metricsEls.replay) this.metricsEls.replay.textContent = `${this.ctrl.replay.size} / ${CONFIG.replayCapacity}`;
      if (this.metricsEls.combo) this.metricsEls.combo.textContent = isEmergency ? '⚠️ REFLEX EVASION' : (combo > 1 ? `⚡ x${combo} STREAK` : '🛡️ IRONCLAD');

      if (this.metricsEls.status) {
        if (!me || me.dead) {
          this.metricsEls.status.textContent = 'RESPAWNING';
          this.metricsEls.status.className = 'badge badge-danger';
        } else if (isEmergency) {
          this.metricsEls.status.textContent = '🛡️ REFLEX SLIP';
          this.metricsEls.status.className = 'badge badge-danger';
        } else if (combo > 1) {
          this.metricsEls.status.textContent = `🔥 MULTI-SWOOP (x${combo})`;
          this.metricsEls.status.className = 'badge badge-combo';
        } else if (inLethalDive) {
          this.metricsEls.status.textContent = '⚡ HAWK DIVE';
          this.metricsEls.status.className = 'badge badge-dive';
        } else if (isAdvantage) {
          this.metricsEls.status.textContent = '🦅 SWOOP ENGAGE';
          this.metricsEls.status.className = 'badge badge-adv';
        } else {
          this.metricsEls.status.textContent = '👑 32-DIM ENN';
          this.metricsEls.status.className = 'badge badge-shield';
        }
      }

      if (qValues && qValues.length) {
        let minQ = Infinity;
        let maxQ = -Infinity;
        for (let i = 0; i < qValues.length; i++) {
          if (qValues[i] < -1000) continue;
          if (qValues[i] < minQ) minQ = qValues[i];
          if (qValues[i] > maxQ) maxQ = qValues[i];
        }
        if (minQ === Infinity) { minQ = 0; maxQ = 1; }
        const qRange = Math.max(1.0, maxQ - minQ);

        for (let i = 0; i < this.qBars.length; i++) {
          const bar = this.qBars[i];
          const val = qValues[i];

          if (val < -1000) {
            bar.fill.style.width = '0%';
            bar.text.textContent = 'VETO';
            bar.text.style.color = '#ff1744';
            bar.fill.className = 'q-bar-fill';
          } else {
            const pct = Math.max(0, Math.min(100, ((val - minQ) / qRange) * 100));
            bar.fill.style.width = `${pct}%`;
            bar.text.textContent = val.toFixed(2);

            if (i === selectedAction) {
              bar.fill.className = `q-bar-fill active`;
              bar.text.style.color = '#ffeb3b';
              bar.text.style.fontWeight = 'bold';
            } else {
              bar.fill.className = 'q-bar-fill';
              bar.text.style.color = '#e0f7fa';
              bar.text.style.fontWeight = 'normal';
            }
          }
        }
      }
    }

    drawCanvasOverlay(me, state) {
      if (!this.canvas || !this.ctx) return;
      const arena = document.getElementById('arena');
      if (arena && this.canvas.parentNode !== arena) {
        arena.appendChild(this.canvas);
      }

      const scale = (typeof view !== 'undefined' && view.scale) || 3;
      const W = (typeof world !== 'undefined' && world.width) || 1168;
      const H = (typeof world !== 'undefined' && world.height) || 600;

      const targetCanvasW = Math.round(W * scale);
      const targetCanvasH = Math.round(H * scale);

      if (this.canvas.width !== targetCanvasW || this.canvas.height !== targetCanvasH) {
        this.canvas.width = targetCanvasW;
        this.canvas.height = targetCanvasH;
        this.canvas.style.width = targetCanvasW + 'px';
        this.canvas.style.height = targetCanvasH + 'px';
      }

      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (!this.showVectors || !me || me.dead) return;

      const meCenterX = (me.x + 8) * scale;
      const meCenterY = (me.y + 10) * scale;

      const isEmergency = state && state[29] > 0;
      const inLethalDive = state && state[28] > 0;
      const isAdvantage = state && state[21] > 0;
      const speedRatio = state ? (state[6] || 0) : 0;

      // Visual Glow Emphasis around Hero Bot (Cardiac Heartbeat Brightness Pulse)
      const now = Date.now();
      const bpm = isEmergency ? 115 : (inLethalDive ? 95 : 68);
      const periodMs = 60000 / bpm;
      const phase = (now % periodMs) / periodMs; // 0.0 to 1.0

      // Cardiac "lub-dub" dual systolic/diastolic pulse waveform
      const beat1 = Math.exp(-Math.pow((phase - 0.12) / 0.055, 2));
      const beat2 = 0.62 * Math.exp(-Math.pow((phase - 0.26) / 0.065, 2));
      const heartIntensity = Math.min(1.0, Math.max(0.0, beat1 + beat2));

      // Dynamic brightness & radius modulation based on heartbeat intensity
      const baseAlpha = 0.12;
      const peakAlpha = 0.75;
      const currentAlpha = baseAlpha + (peakAlpha - baseAlpha) * heartIntensity;
      const glowRadius = Math.round((14 + 10 * heartIntensity) * scale * 0.5);

      let r = 0, g = 255, b = 204; // Neon Teal in cruising flight
      if (isEmergency) {
        r = 255; g = 23; b = 68; // Crimson Red in emergency danger
      } else if (inLethalDive) {
        r = 255; g = 235; b = 59; // Golden Yellow in lethal dive advantage
      }

      ctx.save();
      const glowGrad = ctx.createRadialGradient(meCenterX, meCenterY, 2, meCenterX, meCenterY, glowRadius);
      glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentAlpha.toFixed(3)})`);
      glowGrad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${(currentAlpha * 0.42).toFixed(3)})`);
      glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.0)`);

      ctx.beginPath();
      ctx.arc(meCenterX, meCenterY, glowRadius, 0, 2 * Math.PI);
      ctx.fillStyle = glowGrad;
      ctx.fill();
      ctx.restore();

      // Predictive Trajectory Line (14-tick forward kinematic prediction with directional arrowhead)
      const traj = [{ x: me.x, y: me.y }];
      let simX = me.x;
      let simY = me.y;
      let simVx = me.vx || 0;
      let simVy = me.vy || 0;
      const predictor = this.ctrl && this.ctrl.env ? this.ctrl.env.predictor : null;
      const platforms = (typeof world !== "undefined" && world.platform) || [];
      const predTicks = 14;

      for (let t = 1; t <= predTicks; t++) {
        if (predictor) {
          const next = predictor.simStep(simX, simY, simVx, simVy, 0, false, W, H, platforms);
          simX = next.x;
          simY = next.y;
          simVx = next.vx;
          simVy = next.vy;
        } else {
          simVy += 0.15;
          if (simVy > 8.0) simVy = 8.0;
          simX += simVx;
          simY += simVy;
          const w = W - 16;
          if (simX < 0) simX += w;
          if (simX >= w) simX -= w;
          if (simY < 46) simY = 46;
        }
        traj.push({ x: simX, y: simY });
      }

      if (traj.length > 1) {
        ctx.beginPath();
        const strokeColor = isEmergency ? '#ff1744' : (inLethalDive ? '#ffeb3b' : 'rgba(0, 255, 204, 0.9)');
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = inLethalDive ? 3.5 : 2.5;
        for (let i = 0; i < traj.length; i++) {
          const px = (traj[i].x + 8) * scale;
          const py = (traj[i].y + 10) * scale;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            // Handle toroidal screen wrapping smoothly so lines don't streak across the screen
            if (Math.abs(traj[i].x - traj[i - 1].x) > (W - 16) / 2) {
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
        }
        ctx.stroke();

        // Arrowhead at the end of the hero's trajectory line
        const lastIdx = traj.length - 1;
        const prevIdx = Math.max(0, lastIdx - 1);
        const p1x = (traj[prevIdx].x + 8) * scale;
        const p1y = (traj[prevIdx].y + 10) * scale;
        const p2x = (traj[lastIdx].x + 8) * scale;
        const p2y = (traj[lastIdx].y + 10) * scale;

        const angle = Math.atan2(p2y - p1y, p2x - p1x);
        const headLength = 9.0 * scale * 0.5;

        ctx.beginPath();
        ctx.fillStyle = isEmergency ? '#ff1744' : (inLethalDive ? '#ffeb3b' : '#00ffcc');
        ctx.moveTo(p2x, p2y);
        ctx.lineTo(
          p2x - headLength * Math.cos(angle - Math.PI / 6),
          p2y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          p2x - (headLength * 0.6) * Math.cos(angle),
          p2y - (headLength * 0.6) * Math.sin(angle)
        );
        ctx.lineTo(
          p2x - headLength * Math.cos(angle + Math.PI / 6),
          p2y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      }

      // Visual Overlay for ALL Players' Predicted Future Tracks
      const worldPlayers = (typeof world !== 'undefined' && world.players) ? world.players : [];
      for (let i = 0; i < worldPlayers.length; i++) {
        const p = worldPlayers[i];
        if (!p || p.id === world.myId || p.dead) continue;

        const oppTraj = [{ x: p.x, y: p.y }];
        let enX = p.x;
        let enY = p.y;
        let enVx = p.vx || 0;
        let enVy = p.vy || 0;

        for (let t = 1; t <= 12; t++) {
          if (predictor) {
            const next = predictor.simStep(enX, enY, enVx, enVy, 0, false, W, H, platforms);
            enX = next.x;
            enY = next.y;
            enVx = next.vx;
            enVy = next.vy;
          } else {
            enVy += 0.15;
            if (enVy > 8.0) enVy = 8.0;
            enX += enVx;
            enY += enVy;
            const w = W - 16;
            if (enX < 0) enX += w;
            if (enX >= w) enX -= w;
            if (enY < 46) enY = 46;
          }
          oppTraj.push({ x: enX, y: enY });
        }

        const isTeammate = (p.team === me.team);
        const weHaveAdvantage = (me.y < p.y - 4);
        
        let trackColor;
        if (isTeammate) {
          trackColor = 'rgba(0, 230, 118, 0.55)'; // Friendly green
        } else if (weHaveAdvantage) {
          trackColor = 'rgba(255, 215, 0, 0.75)'; // Golden vulnerable target
        } else {
          trackColor = 'rgba(255, 40, 90, 0.75)'; // Crimson lethal threat above
        }

        ctx.beginPath();
        ctx.strokeStyle = trackColor;
        ctx.lineWidth = 1.6;
        ctx.setLineDash([4, 3]);

        for (let t = 0; t < oppTraj.length; t++) {
          const pt = oppTraj[t];
          const px = (pt.x + 8) * scale;
          const py = (pt.y + 10) * scale;

          if (t === 0) {
            ctx.moveTo(px, py);
          } else {
            if (Math.abs(pt.x - oppTraj[t - 1].x) > (W - 16) / 2) {
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Small directional tick at the predicted future endpoint
        const lastPt = oppTraj[oppTraj.length - 1];
        ctx.beginPath();
        ctx.arc((lastPt.x + 8) * scale, (lastPt.y + 10) * scale, 3.2 * scale * 0.5, 0, 2 * Math.PI);
        ctx.fillStyle = trackColor;
        ctx.fill();
      }
    }

    destroy() {
      if (this.animFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
        window.cancelAnimationFrame(this.animFrameId);
      }
      if (this.container) this.container.remove();
      if (this.canvas) this.canvas.remove();
    }
  }

      // ==========================================================================
  // DYNAMIC ENGINE-ACCURATE TACTICAL COMBAT CORE
  // Tailored specifically to joust.life collision geometry and toroidal physics:
  // - Kill condition: y_me < y_enemy - 6px
  // - Death condition: y_me > y_enemy + 6px
  // - Flap impulse: vy -= 2.5 (cap -10), Gravity: +0.15, Max vx: 2.5
  // ==========================================================================
  class DynamicOpponentTracker {
    constructor() {
      this.enemyStates = new Map(); // id -> { lastX, lastY, flapTendency, lastSeen }
    }

    update(enemies) {
      if (!enemies) return;
      const now = Date.now();

      for (let i = 0; i < enemies.length; i++) {
        const en = enemies[i];
        if (!en || !en.id || en.dead) continue;

        let st = this.enemyStates.get(en.id);
        if (!st) {
          st = { id: en.id, lastY: en.y, flapCount: 0, sampleCount: 0, isAscending: false };
          this.enemyStates.set(en.id, st);
        }

        if (en.vy < -1.0) st.flapCount++;
        st.sampleCount++;
        st.isAscending = (en.vy < 0);
        st.lastY = en.y;
      }
    }

    getEnemyInfo(id) {
      return this.enemyStates.get(id) || null;
    }
  }

  class EngineAccurateTacticalCore {
    constructor(controller) {
      this.ctrl = controller;
      this.tracker = new DynamicOpponentTracker();
    }

    update(me, enemies, W, H, platforms) {
      this.tracker.update(enemies);
    }

        computeTacticalAction(me, target, threat, enemies, W, H, platforms) {
      if (!me || me.dead) return ACTIONS.IDLE;

      // 1. REFLEXIVE ZERO-DEATH EVASION: enemy is overhead within lethal strike cone
      if (threat && !threat.dead) {
        const tDx = this.ctrl.env.shortestToroidalDx(me.x, threat.x, W);
        const tDy = threat.y - me.y;

        if (tDy < 6 && Math.abs(tDx) < CONFIG.lethalThreatRadiusX) {
          return tDx >= 0 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
        }
      }

      // 2. OBSTACLE HORIZONTAL BYPASS: if right below a platform, glide laterally past lip
      const overhead = this.ctrl.env.predictor.getOverheadPlatformObstacle(me, platforms, W);
      if (overhead.blocked && overhead.gap < 55) {
        return overhead.escapeDir === -1 ? ACTIONS.LEFT : ACTIONS.RIGHT;
      }

      // 3. GROUNDED LAUNCH: never stay on platforms
      if (me.grounded) {
        return me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
      }

      // 4. BIRD OF PREY PURSUIT & ZERO-MISS PROPORTIONAL NAVIGATION DIVE
      if (target && !target.dead) {
        const dx = this.ctrl.env.shortestToroidalDx(me.x, target.x, W);
        const dy = target.y - me.y; // Positive = target is BELOW us (Kill Advantage!)

        // A) ZERO-MISS PROPORTIONAL NAVIGATION FALCON DIVE:
        // Confirmed height advantage (dy >= 8px)
        if (dy >= 8) {
          // Continuous trajectory servoing:
          const estVy = Math.max(1.0, me.vy || 1.0);
          const impactTicks = Math.max(1, Math.min(20, Math.round(dy / estVy)));
          const projectedX = target.x + (target.vx || 0) * impactTicks;
          const leadDx = this.ctrl.env.shortestToroidalDx(me.x, projectedX, W);

          // Micro-steering: CUT FLAPS, servo horizontally onto center
          if (leadDx < -2.0) {
            return ACTIONS.LEFT;
          } else if (leadDx > 2.0) {
            return ACTIONS.RIGHT;
          } else {
            return ACTIONS.IDLE; // Direct vertical drop straight into enemy headbox
          }
        }

        // B) HIGH GROUND AGGRESSIVE CLIMB: climb while closing in horizontally
        if (dy < 14 || me.y > CONFIG.apexCruisingMaxY) {
          const climbFlap = (me.y > 50 && me.vy > -1.2);
          if (climbFlap) {
            return dx > 0 ? ACTIONS.RIGHT_FLAP : ACTIONS.LEFT_FLAP;
          }
          return dx > 0 ? ACTIONS.RIGHT : ACTIONS.LEFT;
        }

        // C) APEX CLOSING ON PREY:
        const leadTicks = Math.min(15, Math.max(1, Math.abs(dx) / 2.5));
        const leadX = target.x + (target.vx || 0) * leadTicks;
        const leadDx = this.ctrl.env.shortestToroidalDx(me.x, leadX, W);
        const flapCadence = (me.y > 65 && me.vy > 0.35);

        if (leadDx < -6) {
          return flapCadence ? ACTIONS.LEFT_FLAP : ACTIONS.LEFT;
        } else if (leadDx > 6) {
          return flapCadence ? ACTIONS.RIGHT_FLAP : ACTIONS.RIGHT;
        } else {
          return ACTIONS.IDLE;
        }
      }

      // 5. APEX PATROL: maintain cruising altitude in top thermal corridor (y: 45-75px)
      if (me.y > 80) return me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
      if (me.y > 60 && me.vy > 0.35) return ACTIONS.FLAP;
      return ACTIONS.IDLE;
    }
  }

  // ==========================================================================
  // MASTER ZERO-DEATH CONTROLLER CLASS
  // ==========================================================================
  class JoustQLearningController {
    constructor() {
      this.env = new JoustEnv();
      this.actions = new GracefulActionExecutor();
      this.actions.ctrl = this;
      this.rewardEngine = new RewardEngine();
      this.rewardEngine.ctrl = this;
      this.tacticalCore = new EngineAccurateTacticalCore(this);

      this.qNet = new QNetwork(CONFIG.stateDim, CONFIG.actionDim, CONFIG.h1Size, CONFIG.h2Size, CONFIG.predDim);
      this.targetNet = new QNetwork(CONFIG.stateDim, CONFIG.actionDim, CONFIG.h1Size, CONFIG.h2Size, CONFIG.predDim);
      this.targetNet.copyFrom(this.qNet);

      this.replay = new ReplayBuffer(CONFIG.replayCapacity, CONFIG.stateDim, CONFIG.predDim);

      this.currentState = new Float32Array(CONFIG.stateDim);
      this.nextState = new Float32Array(CONFIG.stateDim);
      this.lastAction = ACTIONS.IDLE;
      this.hasValidLastState = false;

      this.epsilon = CONFIG.epsilonInitial;
      this.isLearning = true;
      this.isExploring = true;

      this.totalSteps = 0;
      this.totalKills = 0;
      this.totalDeaths = 0;
      this.lastFragCount = 0;
      this.episodeReward = 0;
      this.recentLoss = 0;
      this.lossHistory = [];

      this.loopTimer = null;
      this.saveTimer = null;

      this.loadModel();
      this.hud = new VisualHUD(this);
      this.hookGameEvents();
      this.start();

      console.log('[Q-Bot] Ironclad Zero-Death Apex Controller initialized.');
    }

    hookGameEvents() {
      const checkStats = () => {
        const me = this.env.getMe();
        if (me) {
          const currentFrags = me.fragcount || me.score || 0;
          if (currentFrags > this.lastFragCount) {
            this.totalKills += currentFrags - this.lastFragCount;
            this.lastFragCount = currentFrags;
          }
        }
      };
      this.statsInterval = setInterval(checkStats, 200);

      if (typeof world !== 'undefined') {
        const origOnBump = world.onBump;
        world.onBump = (guy) => {
          if (origOnBump) origOnBump(guy);
          if (guy === this.env.getMe()) {
            this.rewardEngine.hadTerrainBump = true;
          }
        };
      }
    }

    start() {
      if (this.loopTimer) clearInterval(this.loopTimer);
      this.loopTimer = setInterval(() => this.step(), CONFIG.decisionIntervalMs);

      if (this.saveTimer) clearInterval(this.saveTimer);
      this.saveTimer = setInterval(() => this.saveModel(true), CONFIG.autoSaveIntervalMs);
    }

    step() {
      const me = this.env.getMe();
      if (!me) {
        if (this.hud) this.hud.update(this.actions.smoothedQ, ACTIONS.IDLE, false, this.currentState, 0, 0);
        return;
      }

      if (me.dead) {
        if (!this.wasDeadLastStep) {
          this.totalDeaths++;
          this.wasDeadLastStep = true;
        }
      } else {
        this.wasDeadLastStep = false;
      }

      const enemies = this.env.getEnemies();
      this.tacticalCore.update(me, enemies, (typeof world !== "undefined" && world.width) || 1168, (typeof world !== "undefined" && world.height) || 600, (typeof world !== "undefined" && world.platform) || []);
      const validState = this.env.extractState(this.currentState, this.lastAction);
      if (!validState) {
        if (this.hud) this.hud.update(this.actions.smoothedQ, ACTIONS.IDLE, false, this.currentState, 0, 0);
        return;
      }
      const worldHeight = (typeof world !== 'undefined' && world.height) || 600;

      if (this.hasValidLastState && this.isLearning) {
        const reward = this.rewardEngine.computeReward(
          me,
          this.currentState,
          this.lastAction,
          enemies,
          worldHeight
        );
        this.episodeReward += reward;

        const done = me.dead;
        const futureTarget = this.extractFutureGroundTruth(me, (typeof world !== 'undefined' && world.players) ? world.players : [], (typeof world !== 'undefined' && world.width) || 1168, worldHeight, (typeof world !== 'undefined' && world.platform) ? world.platform : []);
        this.replay.push(this.nextState, this.lastAction, reward, this.currentState, futureTarget, done);

        if (this.totalSteps % CONFIG.trainFrequencyTicks === 0 && this.replay.size >= CONFIG.minReplayBeforeTrain) {
          this.trainBatch();
        }
      }

      const rawQValues = this.qNet.predict(this.currentState);
      const isEmergency = this.currentState[29] > 0;
      const inLethalDive = this.currentState[28] > 0;

      let selectedAction = ACTIONS.IDLE;
      let isExploratory = false;

      // In emergency danger, exploration is strictly disabled! Pure reflexive survival!
      if (this.isExploring && Math.random() < this.epsilon && !isEmergency) {
        isExploratory = true;
        selectedAction = this.selectApexExplorationAction(this.currentState, me);
      } else {
        selectedAction = this.actions.filterAction(rawQValues, this.lastAction, me, isEmergency, inLethalDive, this.env);
      }

      // Execute chosen action
            // Anti-Stuck Watchdog: detect position stalls
      if (!this.lastPositions) this.lastPositions = [];
      const nowMs = Date.now();
      this.lastPositions.push({ x: me.x, y: me.y, time: nowMs });
      if (this.lastPositions.length > 25) this.lastPositions.shift();

      let isStuck = false;
      if (this.lastPositions.length >= 20) {
        const oldest = this.lastPositions[0];
        const current = this.lastPositions[this.lastPositions.length - 1];
        const distMoved = Math.hypot(current.x - oldest.x, current.y - oldest.y);
        const timeElapsed = current.time - oldest.time;
        if (distMoved < 16 && timeElapsed > 750) {
          isStuck = true;
        }
      }

      // Execute action / emergency bypass
      let actionToExecute = selectedAction;
      if (isStuck && !isEmergency) {
        const W = (typeof world !== "undefined" && world.width) || 1168;
        const escapeDir = me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
        actionToExecute = escapeDir;
        this.actions.triggerFlap(nowMs, 50, 40);
        this.lastPositions = [];
      }

      this.actions.execute(actionToExecute, me, isEmergency || isStuck, inLethalDive);

      this.nextState.set(this.currentState);
      this.lastAction = selectedAction;
      this.hasValidLastState = true;
      this.totalSteps++;

      if (this.isExploring && this.epsilon > CONFIG.epsilonMin) {
        this.epsilon *= CONFIG.epsilonDecay;
      }

      if (this.isLearning) {
        this.targetNet.polyakUpdateFrom(this.qNet, CONFIG.targetSyncTau);
      }

      this.hud.update(
        this.actions.smoothedQ,
        selectedAction,
        isExploratory,
        this.currentState,
        this.episodeReward,
        this.recentLoss
      );
    }

    selectApexExplorationAction(state, me) {
      const target = this.env ? this.env.lockedTarget : null;
      const W = (typeof world !== "undefined" && world.width) || 1168;
      if (!target || target.dead) {
        return me.x > W / 2 ? ACTIONS.LEFT_FLAP : ACTIONS.RIGHT_FLAP;
      }

      const dx = this.env.shortestToroidalDx(me.x, target.x, W);
      const dy = target.y - me.y;

      // Always hunt and charge towards target
      if (dy < 10) {
        // Climb while closing distance
        return dx > 0 ? ACTIONS.RIGHT_FLAP : ACTIONS.LEFT_FLAP;
      } else {
        // High ground lethal dive rush
        if (Math.abs(dx) > 16) {
          return dx > 0 ? ACTIONS.RIGHT : ACTIONS.LEFT;
        } else {
          return dx > 0 ? ACTIONS.RIGHT_FLAP : ACTIONS.LEFT_FLAP;
        }
      }
    }

    shortestToroidalDx(fromX, toX, width) {
      if (this.env && typeof this.env.shortestToroidalDx === 'function') {
        return this.env.shortestToroidalDx(fromX, toX, width);
      }
      const w = width - 16;
      let dx = toX - fromX;
      if (dx > w / 2) dx -= w;
      if (dx < -w / 2) dx += w;
      return dx;
    }

    predictKinematics(x, y, vx, vy, t, W, H, platforms = null) {
      if (this.env && typeof this.env.predictKinematics === 'function') {
        return this.env.predictKinematics(x, y, vx, vy, t, W, H);
      }
      const w = W - 16;
      let px = (x + vx * t) % w;
      if (px < 0) px += w;
      let pvy = Math.min(8.0, vy + 0.15 * t);
      let py = Math.max(46, Math.min(H - 30, y + vy * t + 0.075 * t * t));
      return { x: px, y: py, vx, vy: pvy };
    }

    extractFutureGroundTruth(me, worldPlayers, W, H, platforms) {
      const out = new Float32Array(CONFIG.predDim);
      if (!me) return out;
      const myF6 = this.predictKinematics(me.x, me.y, me.vx || 0, me.vy || 0, 6, W, H);
      const myF12 = this.predictKinematics(me.x, me.y, me.vx || 0, me.vy || 0, 12, W, H);
      out[0] = (myF6.x / (W - 16)) * 2 - 1;
      out[1] = (myF6.y / H) * 2 - 1;
      out[2] = (myF6.vx || 0) / 2.5;
      out[3] = (myF6.vy || 0) / 8.0;
      out[4] = (myF12.x / (W - 16)) * 2 - 1;
      out[5] = (myF12.y / H) * 2 - 1;
      out[6] = (myF12.vx || 0) / 2.5;
      out[7] = (myF12.vy || 0) / 8.0;

      let oppIdx = 0;
      for (let i = 0; i < worldPlayers.length && oppIdx < 3; i++) {
        const p = worldPlayers[i];
        if (!p || p.id === world.myId || p.team === me.team || p.dead) continue;
        const opF6 = this.predictKinematics(p.x, p.y, p.vx || 0, p.vy || 0, 6, W, H);
        const opF12 = this.predictKinematics(p.x, p.y, p.vx || 0, p.vy || 0, 12, W, H);

        const base = 8 + oppIdx * 8;
        out[base + 0] = this.shortestToroidalDx(myF6.x, opF6.x, W) / (W / 2);
        out[base + 1] = (opF6.y - myF6.y) / H;
        out[base + 2] = (opF6.vx || 0) / 2.5;
        out[base + 3] = (opF6.vy || 0) / 8.0;
        out[base + 4] = this.shortestToroidalDx(myF12.x, opF12.x, W) / (W / 2);
        out[base + 5] = (opF12.y - myF12.y) / H;
        out[base + 6] = (opF12.vx || 0) / 2.5;
        out[base + 7] = (opF12.vy || 0) / 8.0;
        oppIdx++;
      }
      return out;
    }

    trainBatch() {
      const batchSize = CONFIG.trainBatchSize;
      const indices = this.replay.sample(batchSize);

      const s = new Float32Array(CONFIG.stateDim);
      const nextS = new Float32Array(CONFIG.stateDim);
      const targetFuture = new Float32Array(CONFIG.predDim);
      const nextQOnline = new Float32Array(CONFIG.actionDim);
      const nextQTarget = new Float32Array(CONFIG.actionDim);

      let totalBatchLoss = 0;

      for (let i = 0; i < batchSize; i++) {
        const idx = indices[i];
        this.replay.getState(idx, s);
        this.replay.getNextState(idx, nextS);
        this.replay.getFutureTarget(idx, targetFuture);
        const action = this.replay.actions[idx];
        const reward = this.replay.rewards[idx];
        const done = this.replay.dones[idx];

        let targetY = reward;
        if (!done) {
          this.qNet.predict(nextS, nextQOnline);
          this.targetNet.predict(nextS, nextQTarget);

          let bestAction = 0;
          let maxNextQ = -Infinity;
          for (let a = 0; a < CONFIG.actionDim; a++) {
            if (nextQOnline[a] > maxNextQ) {
              maxNextQ = nextQOnline[a];
              bestAction = a;
            }
          }

          targetY += CONFIG.gamma * nextQTarget[bestAction];
        }

        const currentQ = this.qNet.predict(s)[action];
        const tdError = targetY - currentQ;
        totalBatchLoss += tdError * tdError;

        this.qNet.backward(s, action, tdError, targetFuture);
      }

      this.qNet.stepOptimizer(CONFIG.learningRate);
      this.recentLoss = totalBatchLoss / batchSize;
      this.lossHistory.push(this.recentLoss);
      if (this.lossHistory.length > 100) this.lossHistory.shift();
    }

    saveModel(silent = false) {
      try {
        const data = {
          version: 4,
          savedAt: new Date().toISOString(),
          totalSteps: this.totalSteps,
          totalKills: this.totalKills,
          totalDeaths: this.totalDeaths,
          epsilon: this.epsilon,
          model: this.qNet.toJSON(),
        };
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
        if (!silent) alert('✅ Zero-Death Apex model saved to localStorage!');
        console.log('[Q-Bot] Apex model saved to localStorage.');
      } catch (e) {
        console.warn('[Q-Bot] Failed to save model to localStorage:', e);
      }
    }

    loadModel() {
      // 1. Prioritize Embedded Neural Network Champion Weights
      if (typeof DEFAULT_PRETRAINED_MODEL !== "undefined") {
        const rawModel = DEFAULT_PRETRAINED_MODEL.model || DEFAULT_PRETRAINED_MODEL;
        if (rawModel && (rawModel.l1 || rawModel.weights)) {
          try {
            if (this.qNet.fromJSON(rawModel)) {
              this.targetNet.copyFrom(this.qNet);
              this.epsilon = CONFIG.epsilonMin;
              this.isExploring = false;
              console.log(`[Q-Bot] 🧠 ACTIVE NEURAL NETWORK: Loaded Champion Weights (stateDim=${this.qNet.stateDim}, ε=${this.epsilon.toFixed(3)}).`);
              return true;
            }
          } catch (e) {
            console.error('[Q-Bot] Failed loading embedded neural network weights:', e);
          }
        }
      }

      // 2. Fallback to localStorage
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          const rawModel = data.model || data;
          if (rawModel && this.qNet.fromJSON(rawModel)) {
            this.targetNet.copyFrom(this.qNet);
            this.epsilon = data.epsilon || CONFIG.epsilonInitial;
            console.log(`[Q-Bot] Loaded model from localStorage (${data.totalSteps || 0} steps, ε=${this.epsilon.toFixed(3)}).`);
            return true;
          }
        }
      } catch (e) {
        console.warn("[Q-Bot] Failed to load model from localStorage:", e);
      }

      return false;
    }

    exportModelJSON() {
      const data = {
        version: 4,
        exportedAt: new Date().toISOString(),
        totalSteps: this.totalSteps,
        totalKills: this.totalKills,
        totalDeaths: this.totalDeaths,
        epsilon: this.epsilon,
        model: this.qNet.toJSON(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `joust_apex_model_${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    resetBrain() {
      this.qNet = new QNetwork(CONFIG.stateDim, CONFIG.actionDim, 64);
      this.targetNet = new QNetwork(CONFIG.stateDim, CONFIG.actionDim, 64);
      this.targetNet.copyFrom(this.qNet);
      this.replay.clear();
      this.epsilon = CONFIG.epsilonInitial;
      this.totalSteps = 0;
      this.episodeReward = 0;
      this.totalKills = 0;
      this.totalDeaths = 0;
      this.hasValidLastState = false;
      console.log('[Q-Bot] Brain reset to initial state.');
    }

    destroy() {
      if (this.loopTimer) clearInterval(this.loopTimer);
      if (this.saveTimer) clearInterval(this.saveTimer);
      if (this.statsInterval) clearInterval(this.statsInterval);
      this.actions.releaseAll();
      if (this.hud) this.hud.destroy();
      console.log('[Q-Bot] Controller destroyed.');
    }
  }

  // Instantiate and bind globally
  window.__joustQBot = new JoustQLearningController();
})();
