export default function myErrorHandler(
  error: Error,
  info: { componentStack: string },
) {
  // eslint-disable-next-line no-console
  console.log('Error', error);
  // eslint-disable-next-line no-console
  console.log('componentStack', info.componentStack);
}
