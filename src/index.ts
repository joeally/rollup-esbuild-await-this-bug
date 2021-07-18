export const myAsyncFunction = async (): Promise<void> => {
	await Promise.resolve('hello');
}
