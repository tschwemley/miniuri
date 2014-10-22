<?php
	require_once('../database/db.php');
	require_once('../app/UriClass.php');

	$uri = new UriClass($db);
?>

<head>
<link rel="stylesheet" href="css/application.css">
</head>

<body>
<header>
	<div class="wrapper">
		<div class="container">
			<a class="logo" href="http://miniuri.me"></a>
			<h1>MINIMIZED URIs.</h1>
			<div class="sub-tag">
				Just for you.
			</div>

			<!-- Minify URI Form -->
			<div class="form-wrapper">
				<form method="post" action="http://miniuri.me">
					<input class="minify-uri" name="uri" type="url" placeholder="Enter URI">
					<span class="minify-triangle">
						<input class="minify-submit" name="minify" type="submit" value="Minify">
					</span>
				</form>
			</div>
			<!-- End Minify URI Form -->

			<div class="uri-text">
			<?php

			if (isset($_GET['short'])) {
				$uri = 'http://miniuri.me/' . $_GET['short'];
				echo "Awesome! Your miniuri is: <a href=\"$uri\">$uri</a>";
			}
			?>
			</div>
		</div>
	</div>
</header>
</body>
