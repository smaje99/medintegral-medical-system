import uvicorn


def run():
    '''Run the application.'''
    uvicorn.run('app.app:app', reload=True)
