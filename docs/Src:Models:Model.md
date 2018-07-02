# model.coffee

#### Classes
  
* [root.Model](#root.Model)
  






## Classes
  
### <a name="root.Model">[root.Model](root.Model)</a>
    
    
    
    
#### Instance Methods
      
##### <a name="constructor">constructor(attr)</a>

      
##### <a name="destructor">destructor()</a>

      
##### <a name="has_been_modified">has\_been\_modified()</a>

      
##### <a name="has_been_directly_modified">has\_been\_directly\_modified()</a>

      
##### <a name="bind">bind(f, onchange_construction)</a>

      
##### <a name="unbind">unbind(f)</a>

      
##### <a name="get">get()</a>

      
##### <a name="set">set(value)</a>

      
##### <a name="set_state">set\_state(str)</a>

      
##### <a name="get_state">get\_state(date)</a>

      
##### <a name="add_attr">add\_attr(n, p, signal_change)</a>

      
##### <a name="rem_attr">rem\_attr(name, signal_change)</a>

      
##### <a name="mod_attr">mod\_attr(n, p)</a>

      
##### <a name="set_attr">set\_attr(o)</a>

      
##### <a name="size">size(for_display)</a>

      
##### <a name="dim">dim(for_display)</a>

      
##### <a name="equals">equals(m)</a>

      
##### <a name="get_parents_that_check">get\_parents\_that\_check(func_to_check)</a>

      
##### <a name="deep_copy">deep\_copy()</a>

      
##### <a name="real_change">real\_change()</a>

      
##### <a name="cosmetic_attribute">cosmetic\_attribute(name)</a>

      
    
    
#### Private Methods
      
##### <a name="_get_state">\_get\_state()</a>

      
##### <a name="_get_fs_data">\_get\_fs\_data(out)</a>

      
##### <a name="_set">\_set(value)</a>

      
##### <a name="_signal_change">\_signal\_change(change_level)</a>

      
##### <a name="_set_state">\_set\_state(str, map)</a>

      
##### <a name="_get_parents_that_check_rec">\_get\_parents\_that\_check\_rec(res, visited, func_to_check)</a>

      
##### <a name="_set_state_if_same_type">\_set\_state\_if\_same\_type(mid, map)</a>

      
##### <a name="_get_flat_model_map">\_get\_flat\_model\_map(map, date)</a>

      
    
  



