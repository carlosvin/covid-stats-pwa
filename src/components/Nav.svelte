<script>
	export let segment;
	let isOffline = false;

	if (typeof window !== 'undefined') {
		window.addEventListener('online',  updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);	
	}

	function updateOnlineStatus(event) {
		isOffline = navigator.onLine ? false : true;
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(221,94,75,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: flex;
		flex-flow: row;
		vertical-align: middle;
	}

	.offline {
		color: brown;
		border-radius: 0.3em;
		padding: 0.3em;
		vertical-align: middle;
		border: 1px solid;
		font-size: smaller;
	}

	ul {
		margin: 0;
		padding: 0;
		flex-grow: 1;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgba(70,3,33, 0.156);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>
		{#if segment === "countries" }
		<li><a aria-current='{segment === "countries" ? "page" : undefined}' href='/'> {'< '}
		</a></li>
		{/if}
	</ul>
	{#if isOffline}
		<p class='offline'>offline</p>
	{/if}
</nav>
