import uvicorn


__all__ = ('run',)


def run():
  '''Run the application.'''
  uvicorn.run('app.app:app', reload=True)
