import { parseISO } from 'date-fns';
import * as SQLite from 'expo-sqlite';
import { IWorkout } from '../atoms/workouts';

const db = SQLite.openDatabase('workouts.db');

db.transaction((tx) => {
	tx.executeSql(`
		CREATE TABLE IF NOT EXISTS workouts (
			id TEXT PRIMARY KEY,
			rounds INT,
			workTime INT,
			restTime INT,
			startedAt DATETIME,
			finishedAt DATETIME,
			pausedAt DATETIME,
			cancelledAt DATETIME
	);`);
});

export const saveWorkout = ({
	id,
	rounds,
	workTime,
	restTime,
	startedAt,
	finishedAt,
	pausedAt,
	cancelledAt,
}: IWorkout): Promise<boolean> =>
	new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				`INSERT INTO workouts (
					id,
					rounds,
					workTime,
					restTime,
					startedAt,
					finishedAt,
					pausedAt,
					cancelledAt
				) values (?, ?, ?, ?, ?, ?, ?, ?)`,
				[
					id,
					rounds,
					workTime,
					restTime,
					startedAt?.toISOString(),
					finishedAt?.toISOString(),
					pausedAt?.toISOString(),
					cancelledAt?.toISOString(),
				],
				() => resolve(true),
				(_, error) => {
					reject(error);
					return false;
				},
			);
		});
	});

export const getWorkouts = (): Promise<IWorkout[]> =>
	new Promise((resolve, reject) => {
		db.transaction((tx) => {
			// sending 4 arguments in executeSql
			tx.executeSql(
				'SELECT * FROM workouts WHERE cancelledAt IS NULL ORDER BY startedAt DESC',
				null,
				(_, { rows: { _array } }) =>
					resolve(
						_array.map(({ startedAt, finishedAt, pausedAt, cancelledAt, ...item }) => ({
							...item,
							startedAt: startedAt ? parseISO(startedAt) : undefined,
							finishedAt: finishedAt ? parseISO(finishedAt) : undefined,
							pausedAt: pausedAt ? parseISO(pausedAt) : undefined,
							cancelledAt: cancelledAt ? parseISO(cancelledAt) : undefined,
						})),
					),
				(_, error) => {
					reject(error);
					return false;
				},
			);
		});
	});

export const deleteWorkout = (id: string): Promise<boolean> =>
	new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'DELETE FROM workouts WHERE id = ?',
				[id],
				() => resolve(true),
				(_, error) => {
					reject(error);
					return false;
				},
			);
		});
	});
