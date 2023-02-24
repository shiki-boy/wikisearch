bash:
	@docker-compose exec backend bash

shell:
	@docker-compose exec backend bash -c "python manage.py shell_plus"
