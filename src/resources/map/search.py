import json

NUMBER = 72;

def find_object_index(filename, json_path): # type: ignore
    with open(json_path, "r") as file: # type: ignore
        data = json.load(file)

    for index, obj in enumerate(data):
        if obj["filename"] == filename:
            return index
    return None


if __name__ == "__main__":
    json_path = "./positions.json"
    filename_to_search = f"house chunk_{NUMBER}.png"
    index = find_object_index(filename_to_search, json_path)

    if index is not None:
        print(
            f"The index of the object with filename '{filename_to_search}' is {index}."
        )
    else:
        print(f"Object with filename '{filename_to_search}' not found.")
