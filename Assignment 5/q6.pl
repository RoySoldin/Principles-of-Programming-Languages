% Signature: sub(Sublist, List)/2
% Purpose: All elements in Sublist appear in List in the same order. 
% Precondition: List is fully instantiated (queries do not include variables in their first argument). 
% Example:
% ?- sub(X, [1, 2, 3]).
% X = [1, 2, 3];
% X = [1, 2];
% X = [1, 3];
% X = [2, 3];
% X = [1];
% X = [2];
% X = [3];
% X = [];
% false

sub(Sublist, List) :=
		



namespace_list(Name, PageList) :-
				namespaces(NamespaceNumber, Name) ,
				list(NamespaceNumber, [], PageList).
				
list(NamespaceNumber, Acc, PageList):-
		page(PageId, NamespaceNumber, PageName, PageSize) ,
		not_member(PageId, Acc) ,!,
		list(NamespaceNumber, [PageId|Acc], PageList).
list(_, PageList, PageList).
				
