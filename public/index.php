<?php
	require_once('../database/db.php');
?>

<head>
<link rel="stylesheet" href="css/application.css">
</head>

<body>
<header>
	<div class="wrapper">
		<div class="container">
			<a class="logo" href="#"></a>
			<h1>MINIMIZED URIs.</h1>
			<div class="sub-tag">
				Just for you.
			</div>

			<!-- Minify URI Form -->
			<div class="form-wrapper">
				<form>
					<input class="minify-uri" name="uri" type="url" placeholder="Enter URI">
					<span class="minify-triangle">
						<input class="minify-submit" name="minify" type="submit" value="Minify">
					</span>
				</form>
			</div>
			<!-- End Minify URI Form -->
		</div>
	</div>
</header>
</body>
