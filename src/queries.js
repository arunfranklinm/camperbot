/**
 * Methods which manipulate the database or queries it
 */
import { db, sql } from './libs/postgres';

/**
 * Inserts new user into our accounts table. Note that you have
 * to handle if the user already exists
 *
 * @param {float} discordId
 *    discord id of the user (right click user in developer mode)
 * @param {(data: any) => void} callback
 *    Function which will be called after making the query
 * @param {(error: any) => void}} errorHandler
 *    Function which will be called if an error occurs
 */
export const insertAccount = ({
  discordId,
  createdAt,
  callback,
  errorHandler,
}) => {
  const query = sql`
    INSERT INTO accounts(discord_id, created_at) VALUES(${discordId}, ${createdAt})
  `;

  db
    .none(query)
    .then(callback)
    .catch(errorHandler);
};

// Increment marshmellows for a given array of users
export const incrementMarshmellow = ({
  discordId, // array of discord ids
  callback,
  errorHandler,
}) => {
  const query = sql`
    UPDATE accounts SET marshmellows = marshmellows + 1
    WHERE discord_id = ${discordId}
    RETURNING accounts.marshmellows
  `;

  db
    .any(query)
    .then(callback)
    .catch(errorHandler);
};

// Get total marshmellows for a single user
export const getMarshmellows = ({ discordId, callback, errorHandler }) => {
  const query = sql`
    SELECT marshmellows FROM accounts
    WHERE discord_id = ${discordId}
  `;

  db
    .one(query)
    .then(callback)
    .catch(errorHandler);
};
