import dataiku
import pandas as pd
from flask import request
import numpy as np

intitialized = False

# @app.route('/initialize')
# def initialize():
#     # global global_ref
    
#     get_user()

#     init_proj_dataset()

#     return json.dumps({'result': 'success'})

def init_dataset_dataset():
    client = dataiku.api_client()
    proj = client.get_default_project()

    ds_name = '--Thread-Datasets--'
    ds_loc = 'thread_datasets.csv'
    ds = proj.get_dataset(ds_name)

    exists = ds.exists()
    if not exists:
        project_variables = dataiku.get_custom_variables()

        params = {'connection': 'filesystem_folders', 'path': project_variables['projectKey']  + '/' + ds_loc}
        format_params = {'separator': '\t', 'style': 'unix', 'compress': ''}

        csv_dataset = proj.create_dataset(ds_name, type='Filesystem', params=params,
                                            formatType='csv', formatParams=format_params)

        # Set dataset to managed
        ds_def = csv_dataset.get_definition()
        ds_def['managed'] = True
        csv_dataset.set_definition(ds_def)

        # Set schema
        csv_dataset.set_schema({'columns': [{'name': 'name', 'type':'string'}]})

        ds2 = dataiku.Dataset(ds_name)
        df = pd.DataFrame(columns=['project','name'])
        
        ds2.write_with_schema(df)

        print(f'created {ds_name} dataset')
    else:
        print(f'{ds_name} already exists')

    return ds, exists

# def init_proj_dataset():
#     client = dataiku.api_client()
#     proj = client.get_default_project()

#     ds_name = '--Thread-Projects--'
#     ds_loc = 'thread_projects.csv'
#     ds = proj.get_dataset(ds_name)
#     if not ds.exists():
#         project_variables = dataiku.get_custom_variables()

#         params = {'connection': 'filesystem_folders', 'path': project_variables['projectKey']  + '/' + ds_loc}
#         format_params = {'separator': '\t', 'style': 'unix', 'compress': ''}

#         csv_dataset = proj.create_dataset(ds_name, type='Filesystem', params=params,
#                                             formatType='csv', formatParams=format_params)

#         # Set dataset to managed
#         ds_def = csv_dataset.get_definition()
#         ds_def['managed'] = True
#         csv_dataset.set_definition(ds_def)

#         # Set schema
#         csv_dataset.set_schema({'columns': [{'name': 'name', 'type':'string'}]})

#         ds2 = dataiku.Dataset(ds_name)
#         df = pd.DataFrame(columns=['name'])
        
#         ds2.write_with_schema(df)

#         print(f'created {ds_name} dataset')
#     else:
#         print(f'{ds_name} already exists')

#     return ds


@app.route('/getuser')
def getuser():
    usr = get_user()

    return json.dumps({"user": usr})

@app.route('/get-projects')
def get_projects():
    # proj_ds = init_proj_dataset()
    ds_ds, exists = init_dataset_dataset()

    res = {}
    if not exists:
        res = scan_server(ds_ds)
    else:
        ds_df = dataiku.Dataset(ds_ds.name).get_dataframe()
        projs = ds_df['project'].unique()

        for p in projs:
            res[p] = {}
            res[p]['datasets'] = ds_df.query(f'project=="{p}"').to_dict(orient='records')

    return json.dumps(res)

@app.route('/dataset-details', methods=['POST'])
def dataset_details():
    data = json.loads(request.data)
    dataset_name = data['dataset-name']
    project = data['project']

    # print(dataset_name)
    client = dataiku.api_client()
    ds_proj = client.get_project(project)
    ds_list = ds_proj.list_datasets()
    
    # ds = dataiku.Dataset(dataset_name, project)

    return json.dumps({
        'success': True,
        'dataset': [x for x in ds_list if x['name']==dataset_name][0],
        'dataset_name': get_full_dataset_name(dataset_name, project)
    })

@app.route('/update-col-desc', methods=['POST'])
def update_col_desc():
    # frm = request.form

    # print('POST!')
    # print(request.data)
    data = json.loads(request.data)
    # print(data['col'])

    cols = data['cols']
    desc = data['desc']

    # print(col, desc)

    # update the orig
    update_column_description(cols, description=desc)

    return json.dumps({
        'success': True
    })

def update_column_description(column_array, description):
    if type(column_array)==str:
        column_array = [column_array]
        
    client = dataiku.api_client()
    for i in column_array:
        lst = i.split('.')
        project, dataset, column = lst[0], lst[1], lst[2]
        p = client.get_project(project)
        ds = p.get_dataset(dataset)
        ds_schema = ds.get_schema()
        for z in ds_schema['columns']: 
            if z['name']==column:
                z['comment']=description

        ds.set_schema(ds_schema)

def scan_server(ds_ds):

    client = dataiku.api_client()
    # root_folder = client.get_root_project_folder()
    # dss_folders = root_folder.list_child_folders()
    
    folder_list = []
    # db_list = []
    # pipeline_list = []
    project_list = []

    scan_obj = {}

    dss_projects = client.list_project_keys()

    # for folder in dss_folders:
    #     if len(folder_list) > 0:
    #         if not folder.get_name() in folder_list:
    #     #         print(f'ignoring folder {folder.get_name()}')
    #             continue

    #     dss_projects = folder.list_project_keys()
    #     print(folder)
    
    ds_list = []
    for proj in dss_projects:
        scan_obj[proj] = {}

        project_list.append(proj)

        # print(proj)
        project = client.get_project(proj)
        # meta = project.get_metadata()
        # settings = project.get_settings().get_raw()

        datasets = project.list_datasets()
        recipes = project.list_recipes()

        scan_obj[proj]['datasets'] = datasets
        scan_obj[proj]['recipes'] = recipes

        for ds in datasets:
            obj = { 'project': proj, 'name': ds.name}
            ds_list.append(obj)

    get_ds_lineage(scan_obj)
    dataset_dataset = dataiku.Dataset(ds_ds.name)
    dataset_dataset.write_with_schema(pd.DataFrame.from_dict(ds_list))

    return scan_obj

def get_ds_by_name(name, all_projects, p_name=None):
    # print(name)
    if '.' in name:
        p_name, d_name = extract_name_project(name)
    else:
        d_name = name

    # print(p_name, d_name)
    for i in range(len(all_projects[p_name]['datasets'])):
        ds = all_projects[p_name]['datasets'][i]
        if ds['name'] == d_name:
            return ds

def extract_name_project(full_ds_name):
    p_name = full_ds_name.split('.')[0]
    d_name = full_ds_name.split('.')[1]

    return p_name, d_name

def get_full_dataset_name(name, project):
    return project + '.' + name

def get_stream(recipe, inputs_outputs, p_name):
    refs = []
    for i in range(len(recipe[inputs_outputs]['main']['items'])):
        name = recipe[inputs_outputs]['main']['items'][i]['ref']
        if '.' in name:
            p_name, d_name = extract_name_project(name)
        else:
            d_name = name

        refs.append(get_full_dataset_name(d_name, p_name))
    
    return refs

def traverse_lineage(ds_name, all_projects, upstream=True):
    try:
        ds = get_ds_by_name(ds_name, all_projects)

        dir = 'lineage_upstream'
        if upstream == False:
            dir = 'lineage_downstream'

        dir_full = dir + '_full'

        if (dir + '_complete') in ds:
            return ds[dir_full]

        next_levels = []
        #print('traversing ' + dir + ' in ' + ds['projectKey'] + '.' + ds['name'])
                
        if dir in ds:
            for l in ds[dir]:
                nxt = traverse_lineage(l, all_projects, upstream)
                # next_levels[dir] = nxt

                next_levels.append({'name':l, dir_full: nxt})

            ds[dir + '_complete'] = 1
            ds[dir_full] = next_levels
            #print('setting lineage for ' + ds['projectKey'] + '.' + ds['name'])

        return next_levels

    except:
        return []

def dataset_project_shares(project):
    exposed = project.get_settings().settings['exposedObjects']['objects']
    for e in exposed:
        if e['type'] == "DATASET":
            rules = e['rules']
            for r in rules:
                proj = r['targetProject']

def get_full_col_name(ds, col):
    ds_name = get_full_dataset_name(ds['name'], ds['projectKey'])

    return ds_name + '.' + col

def get_col_lineage(ds, col_name, all_projects):
    up_matches = []
    down_matches = []

    try:
        if 'lineage_upstream_full' in ds:
            for up in ds['lineage_upstream_full']:
                up_ds = get_ds_by_name(up['name'], all_projects)
                full_col_name = get_full_col_name(up_ds, col_name)
        
                for col in up_ds['schema']['columns']:
                    # print(col, col_name)
                    if col['name'].upper() == col_name.upper():
                        up_matches.append(full_col_name);


        if 'lineage_downstream_full' in ds:
            for down in ds['lineage_downstream_full']:
                down_ds = get_ds_by_name(down['name'], all_projects)
                full_col_name = get_full_col_name(down_ds, col_name)
                
                for col in down_ds['schema']['columns']:
                    if col['name'].upper() == col_name.upper():
                        down_matches.append(full_col_name)
    except:
        print('col lineage error')

    return up_matches, down_matches

def get_dataset_lineage(full_ds_name):
    p_name, ds_name = extract_name_project(full_ds_name)


def get_all_lineage(all_projects):

    # get the 1st level of upstream / downstream
    for p in all_projects:
        project = all_projects[p]

        for r in range(len(project['recipes'])):
            try:
                recipe = project['recipes'][r]
                ins = get_stream(recipe, 'inputs', p)            
                outs = get_stream(recipe, 'outputs', p)            

                for i in ins:
                    try:
                        ds = get_ds_by_name(i, all_projects, p)
                        if not 'lineage_downstream' in ds:
                            ds['lineage_downstream'] = outs
                        else:
                            for o in outs:
                                if not o in ds['lineage_downstream']:
                                    ds['lineage_downstream'].append(o)
                    except:
                        print(f'input lineage error: ' + i)

                for o in outs:
                    try:
                        ds = get_ds_by_name(o, all_projects, p)
                        if not 'lineage_upstream' in ds:
                            ds['lineage_upstream'] = ins
                        else:
                            for i in ins:
                                if not i in ds['lineage_upstream']:
                                    ds['lineage_upstream'].append(i)
                    except:
                        print(f'output lineage error: ' + o)
            except:
                print('lineage error')

    # get the full dataset lineage
    for p in all_projects:
        project = all_projects[p]
        for d in range(len(project['datasets'])):
            ds = project['datasets'][d]
            ds['full_name'] = get_full_dataset_name(ds['name'], p)

            if 'lineage_upstream' in ds:
                traverse_lineage(ds['full_name'], all_projects, upstream=True)

            if 'lineage_downstream' in ds:
                traverse_lineage(ds['full_name'], all_projects, upstream=False)
               
            for i in range(len(ds['schema']['columns'])):
                col = ds['schema']['columns'][i]
                up, down = get_col_lineage(ds, col['name'], all_projects)
                col['lineage_upstream'] = up
                col['lineage_downstream'] = down
                

def get_user():
    headers = dict(request.headers)
    # Get the auth info of the user performing the request
    auth_info = dataiku.api_client().get_auth_info_from_browser_headers(headers)
    # print ("User doing the query is %s" % auth_info["authIdentifier"])
    return auth_info["authIdentifier"]

def get_ds_lineage(all_projects):

    # get the 1st level of upstream / downstream
    for p in all_projects:
        project = all_projects[p]

        for r in range(len(project['recipes'])):
            try:
                recipe = project['recipes'][r]
                ins = get_stream(recipe, 'inputs', p)            
                outs = get_stream(recipe, 'outputs', p)            

                for i in ins:
                    try:
                        ds = get_ds_by_name(i, all_projects, p)
                        if not 'lineage_downstream' in ds:
                            ds['lineage_downstream'] = outs
                        else:
                            for o in outs:
                                if not o in ds['lineage_downstream']:
                                    ds['lineage_downstream'].append(o)
                    except:
                        print(f'input lineage error: ' + i)

                for o in outs:
                    try:
                        ds = get_ds_by_name(o, all_projects, p)
                        if not 'lineage_upstream' in ds:
                            ds['lineage_upstream'] = ins
                        else:
                            for i in ins:
                                if not i in ds['lineage_upstream']:
                                    ds['lineage_upstream'].append(i)
                    except:
                        print(f'output lineage error: ' + o)
            except:
                print('lineage error')

    # get the full dataset lineage
    for p in all_projects:
        project = all_projects[p]
        for d in range(len(project['datasets'])):
            ds = project['datasets'][d]
            ds['full_name'] = get_full_dataset_name(ds['name'], p)

            if 'lineage_upstream' in ds:
                traverse_lineage(ds['full_name'], all_projects, upstream=True)

            if 'lineage_downstream' in ds:
                traverse_lineage(ds['full_name'], all_projects, upstream=False)
               
            for i in range(len(ds['schema']['columns'])):
                col = ds['schema']['columns'][i]
                up, down = get_col_lineage(ds, col['name'], all_projects)
                col['lineage_upstream'] = up
                col['lineage_downstream'] = down