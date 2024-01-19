<div>
	<form method="GET" action="/pdf">
		<input name="text" value="Hello World!" />
		<button type="submit">generate PDF</button>
	</form>
</div>

<style>
	:global(body) {
		height: 100vh;
		margin: 0;
		padding: 1em;
		box-sizing: border-box;
		background: radial-gradient(circle, hsl(240, 100%, 95%), hsl(240, 100%, 85%));
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 40ch;
		gap: 0.5rem;
		filter: drop-shadow(0.2rem 0.4rem 1rem hsla(240, 100%, 85%, 0.3));
	}

	input,
	button {
		font: inherit;
		padding: 0.5rem;
		border: 1px solid hsl(240, 100%, 85%);
		border-radius: 0.2rem;
	}

	input:focus-visible,
	button:focus-visible {
		outline: 2px solid hsl(240, 100%, 60%);
	}

	button {
		background: hsl(240, 100%, 98%);
	}

	button:hover {
		background: hsl(240, 100%, 100%);
	}
</style>
