export interface ParticipantTokenData {
  tournamentId: string;
  userEmail: string;
  teamName?: string;
}

/**
 * Generate a simple unique participant ID/token
 * Simplified version to avoid memory issues
 */
export function generateParticipantId(data: ParticipantTokenData): string {
  const timestamp = Date.now().toString().substr(-4); // Last 4 digits of timestamp
  const randomStr = Math.random().toString(36).substr(2, 4).toUpperCase(); // Simple random

  // Clean tournament ID (if it's a long ObjectId, take last 4 characters)
  const cleanTourId = data.tournamentId.length > 4
    ? data.tournamentId.substring(data.tournamentId.length - 4)
    : data.tournamentId;

  // Prefix for the platform
  const prefix = 'BGMIP';

  return `${prefix}-${cleanTourId}-${randomStr}-${timestamp}`;
}

/**
 * Validate a participant token format
 */
export function validateParticipantId(token: string): boolean {
  const pattern = /^BGMIP-[A-Z0-9]{1,8}-[A-Z0-9]{4}-[0-9]{4}$/i;
  return pattern.test(token);
}

/**
 * Extract tournament ID from participant token (if needed)
 */
export function extractTournamentFromToken(token: string): string {
  const parts = token.split('-');
  if (parts.length >= 2) {
    return parts[1]; // Tournament part
  }
  throw new Error('Invalid participant token format');
}