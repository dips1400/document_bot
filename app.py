# import os
# from dotenv import load_dotenv
# from langchain.document_loaders.csv_loader import CSVLoader
# from langchain.llms import OpenAI
# from flask import Flask, jsonify, request
# from flask_cors import CORS


# load_dotenv()


# app = Flask(__name__)
# CORS(app)

# os.environ["OPENAI_API_KEY"] = "OPENAI_API_KEY"

# @app.route('/predict', methods=['GET','POST'])
# def predict():
#     file = request.files['file']

#     file.save(file.filename)
#     print(file.filename)

#     # agent = CSVLoader(OpenAI(temperature=0), file.filename, verbose=True)

#     # print(agent.agent.llm_chain.prompt.template)

#     # question = request.form['question']

#     # result = agent.run(question)

#     # os.remove(file.filename)

#     # return jsonify({'result': result})

#     result = "helloooo"
#     file_name = filename
#     return jsonify({
#       'result': result,
#       'file_name': file_name,
#       })
    


# if __name__ == '__main__':
#   app.run(debug=True)

# -------------------------------------------------------------------------------------------------------------------------------------------

import os
from dotenv import load_dotenv
from langchain.agents.agent_types import AgentType
from langchain_experimental.agents import create_csv_agent
from langchain.llms import OpenAI
from flask import Flask, jsonify, request
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Read OpenAI API key from environment variable
os.environ["OPENAI_API_KEY"] = "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"

@app.route('/predict', methods=['GET','POST'])
def predict():

    file = request.files['file']
    # print(file)
    # return "done"
    
    # file = request.files['file']
    # print(file.read())

    file.save(file.filename)

    agent = create_csv_agent(OpenAI(api_key="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", temperature=0), file.filename, verbose=True)

    print(agent.agent.llm_chain.prompt.template)

    question = request.form['question']
    print(question)

    result = agent.run(question)

    os.remove(file.filename)

    return jsonify({result})

    # result = "hello world"
   
    # return jsonify({
    #   'result': result
    #   })

if __name__ == '__main__':
  app.run(debug=True)


