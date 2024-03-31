from langchain.llms import CTransformers
import box
import yaml


class LLMSetup:
    def __init__(self):
        with open('config.yml', 'r', encoding='utf8') as ymlfile:
            self.cfg = box.Box(yaml.safe_load(ymlfile))

    def setup_llm(self):
        llm = CTransformers(model=self.cfg.MODEL_BIN_PATH,
                            model_type=self.cfg.MODEL_TYPE,
                            max_new_tokens=self.cfg.MAX_NEW_TOKENS,
                            temperature=self.cfg.TEMPERATURE
                            )
        return llm
